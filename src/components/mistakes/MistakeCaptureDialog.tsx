import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LaTeX } from "@/components/LaTeX";
import { draftUserMistake, saveUserMistake, type MistakeDraft } from "@/lib/user-mistakes.functions";

interface Props {
  questionPrompt?: string;
  topic?: string;
  trigger?: React.ReactNode;
  onSaved?: (code: string) => void;
}

export function MistakeCaptureDialog({ questionPrompt, topic, trigger, onSaved }: Props) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [draft, setDraft] = useState<MistakeDraft | null>(null);
  const qc = useQueryClient();

  const draftFn = useServerFn(draftUserMistake);
  const saveFn = useServerFn(saveUserMistake);

  const drafting = useMutation({
    mutationFn: () => draftFn({ data: { description: text, question_prompt: questionPrompt, topic } }),
    onSuccess: (d) => setDraft(d),
    onError: (e: Error) => toast.error(e.message),
  });

  const saving = useMutation({
    mutationFn: () => saveFn({ data: draft as MistakeDraft }),
    onSuccess: (m) => {
      qc.invalidateQueries({ queryKey: ["user-mistakes"] });
      onSaved?.(m.code);
      toast.success("Saved to your personal mistakes.");
      setOpen(false);
      setDraft(null);
      setText("");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const field = (label: string, value: string, onChange: (v: string) => void, rows = 2) => (
    <label className="block">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
      />
    </label>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline" size="sm" className="gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            My mistake isn't here
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Describe your mistake</DialogTitle>
          <DialogDescription>
            Say what went wrong in plain language. It gets structured into an entry only you can see, taggable from your
            answer log.
          </DialogDescription>
        </DialogHeader>

        {!draft ? (
          <div className="space-y-3">
            <textarea
              value={text}
              rows={5}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. I set up the washer volume with the radii swapped, so I subtracted the outer function from the inner one."
              className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
            <Button
              onClick={() => drafting.mutate()}
              disabled={text.trim().length < 10 || drafting.isPending}
              className="w-full gap-2"
            >
              {drafting.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Draft the entry
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <label className="block">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Title</span>
              <input
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Category</span>
                <input
                  value={draft.category}
                  onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
              </label>
              <label className="block">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Avg points lost</span>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="9"
                  value={draft.est_point_loss}
                  onChange={(e) => setDraft({ ...draft, est_point_loss: Number(e.target.value) })}
                  className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
              </label>
            </div>
            {field("Description", draft.description, (v) => setDraft({ ...draft, description: v }), 3)}
            {field("Example", draft.example, (v) => setDraft({ ...draft, example: v }), 3)}
            {field("How to avoid", draft.how_to_avoid, (v) => setDraft({ ...draft, how_to_avoid: v }), 2)}

            <div className="rounded-lg border border-border bg-elevated/50 p-3 text-sm">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Preview</div>
              <LaTeX>{draft.description}</LaTeX>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setDraft(null)}>
                Back
              </Button>
              <Button className="flex-1 gap-2" onClick={() => saving.mutate()} disabled={saving.isPending}>
                {saving.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                Save to my mistakes
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
