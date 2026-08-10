import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Tag } from "lucide-react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { MistakeCaptureDialog } from "./MistakeCaptureDialog";
import { listUserMistakes, tagAttemptMistake, type UserMistake } from "@/lib/user-mistakes.functions";

interface Props {
  attemptId: string;
  questionPrompt?: string;
  topic?: string;
}

export function MistakeTagger({ attemptId, questionPrompt, topic }: Props) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const qc = useQueryClient();

  const listMine = useServerFn(listUserMistakes);
  const tagFn = useServerFn(tagAttemptMistake);

  const { data: shared } = useQuery({
    queryKey: ["common-mistakes-lite"],
    queryFn: async () => {
      const { data, error } = await supabase.from("common_mistakes").select("code, title, category");
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: mine } = useQuery({
    queryKey: ["user-mistakes"],
    queryFn: async (): Promise<UserMistake[]> => {
      try {
        return await listMine();
      } catch {
        return [];
      }
    },
    retry: false,
  });

  const options = useMemo(() => {
    const all = [
      ...(mine ?? []).map((m) => ({ code: m.code, title: m.title, category: m.category, personal: true })),
      ...(shared ?? []).map((m) => ({ code: m.code, title: m.title, category: m.category, personal: false })),
    ];
    if (!q) return all.slice(0, 40);
    const needle = q.toLowerCase();
    return all.filter((m) => (m.title + m.category).toLowerCase().includes(needle)).slice(0, 40);
  }, [shared, mine, q]);

  const tagging = useMutation({
    mutationFn: (code: string) => tagFn({ data: { attempt_id: attemptId, code } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["answer-log"] });
      toast.success("Mistake tagged.");
      setOpen(false);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 text-[11px] text-muted-foreground hover:text-foreground transition">
          <Tag className="h-3 w-3" />
          Tag mistake
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search mistakes…"
          className="w-full rounded-md border border-border bg-card px-2.5 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="mt-2 max-h-56 overflow-y-auto divide-y divide-border">
          {options.map((m) => (
            <button
              key={m.code}
              onClick={() => tagging.mutate(m.code)}
              disabled={tagging.isPending}
              className="w-full text-left py-2 hover:bg-elevated/60 rounded px-1.5 transition"
            >
              <div className="text-sm leading-tight">{m.title}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
                {m.category}
                {m.personal ? " · personal" : ""}
              </div>
            </button>
          ))}
          {options.length === 0 && (
            <div className="py-3 text-sm text-muted-foreground">Nothing matches that.</div>
          )}
        </div>
        <div className="mt-3">
          <MistakeCaptureDialog
            questionPrompt={questionPrompt}
            topic={topic}
            onSaved={(code) => tagging.mutate(code)}
            trigger={
              <Button variant="outline" size="sm" className="w-full">
                My mistake isn't here → describe it
              </Button>
            }
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
