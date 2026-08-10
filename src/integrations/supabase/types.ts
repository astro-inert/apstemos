export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      attempts: {
        Row: {
          correct: boolean
          created_at: string
          id: string
          mistake_codes: string[]
          points_earned: number
          points_possible: number
          question_id: string
          selected_answer: string | null
          time_spent_seconds: number | null
          topic_id: string | null
          topic_slug: string | null
          unit_id: string | null
          unit_slug: string | null
          user_id: string
        }
        Insert: {
          correct: boolean
          created_at?: string
          id?: string
          mistake_codes?: string[]
          points_earned?: number
          points_possible?: number
          question_id: string
          selected_answer?: string | null
          time_spent_seconds?: number | null
          topic_id?: string | null
          topic_slug?: string | null
          unit_id?: string | null
          unit_slug?: string | null
          user_id: string
        }
        Update: {
          correct?: boolean
          created_at?: string
          id?: string
          mistake_codes?: string[]
          points_earned?: number
          points_possible?: number
          question_id?: string
          selected_answer?: string | null
          time_spent_seconds?: number | null
          topic_id?: string | null
          topic_slug?: string | null
          unit_id?: string | null
          unit_slug?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attempts_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attempts_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      common_mistakes: {
        Row: {
          ap_consequence: string | null
          category: string
          code: string
          description: string
          est_point_loss: number
          example: string | null
          how_to_avoid: string
          title: string
        }
        Insert: {
          ap_consequence?: string | null
          category: string
          code: string
          description: string
          est_point_loss?: number
          example?: string | null
          how_to_avoid: string
          title: string
        }
        Update: {
          ap_consequence?: string | null
          category?: string
          code?: string
          description?: string
          est_point_loss?: number
          example?: string | null
          how_to_avoid?: string
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          exam_date: string
          id: string
          target_score: number
          track: Database["public"]["Enums"]["ap_track"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          exam_date?: string
          id: string
          target_score?: number
          track?: Database["public"]["Enums"]["ap_track"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          exam_date?: string
          id?: string
          target_score?: number
          track?: Database["public"]["Enums"]["ap_track"]
          updated_at?: string
        }
        Relationships: []
      }
      question_uploads: {
        Row: {
          created_at: string
          error: string | null
          extracted_count: number
          filename: string
          id: string
          page_count: number | null
          status: string
          storage_path: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          error?: string | null
          extracted_count?: number
          filename: string
          id?: string
          page_count?: number | null
          status?: string
          storage_path: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          error?: string | null
          extracted_count?: number
          filename?: string
          id?: string
          page_count?: number | null
          status?: string
          storage_path?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          answer: string | null
          ap_value: number
          calculator: boolean
          choices: Json
          common_mistake_codes: string[]
          created_at: string
          created_by: string | null
          difficulty: Database["public"]["Enums"]["difficulty"]
          explanation: string | null
          id: string
          is_published: boolean
          page_end: number | null
          page_image_url: string | null
          page_start: number | null
          part: string | null
          prompt: string
          question_number: number | null
          review_status: string
          rubric: Json
          skills: string[]
          source: string | null
          topic_id: string | null
          topic_slug: string | null
          type: Database["public"]["Enums"]["question_type"]
          unit_id: string | null
          unit_slug: string | null
          updated_at: string
          upload_id: string | null
          year: number | null
        }
        Insert: {
          answer?: string | null
          ap_value?: number
          calculator?: boolean
          choices?: Json
          common_mistake_codes?: string[]
          created_at?: string
          created_by?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty"]
          explanation?: string | null
          id?: string
          is_published?: boolean
          page_end?: number | null
          page_image_url?: string | null
          page_start?: number | null
          part?: string | null
          prompt: string
          question_number?: number | null
          review_status?: string
          rubric?: Json
          skills?: string[]
          source?: string | null
          topic_id?: string | null
          topic_slug?: string | null
          type: Database["public"]["Enums"]["question_type"]
          unit_id?: string | null
          unit_slug?: string | null
          updated_at?: string
          upload_id?: string | null
          year?: number | null
        }
        Update: {
          answer?: string | null
          ap_value?: number
          calculator?: boolean
          choices?: Json
          common_mistake_codes?: string[]
          created_at?: string
          created_by?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty"]
          explanation?: string | null
          id?: string
          is_published?: boolean
          page_end?: number | null
          page_image_url?: string | null
          page_start?: number | null
          part?: string | null
          prompt?: string
          question_number?: number | null
          review_status?: string
          rubric?: Json
          skills?: string[]
          source?: string | null
          topic_id?: string | null
          topic_slug?: string | null
          type?: Database["public"]["Enums"]["question_type"]
          unit_id?: string | null
          unit_slug?: string | null
          updated_at?: string
          upload_id?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "question_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      starred_mistakes: {
        Row: {
          code: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "starred_mistakes_code_fkey"
            columns: ["code"]
            isOneToOne: false
            referencedRelation: "common_mistakes"
            referencedColumns: ["code"]
          },
        ]
      }
      subjects: {
        Row: {
          created_at: string
          id: string
          name: string
          total_points: number
        }
        Insert: {
          created_at?: string
          id: string
          name: string
          total_points: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          total_points?: number
        }
        Relationships: []
      }
      topics: {
        Row: {
          code: string
          description: string | null
          id: string
          name: string
          unit_id: string
        }
        Insert: {
          code: string
          description?: string | null
          id?: string
          name: string
          unit_id: string
        }
        Update: {
          code?: string
          description?: string | null
          id?: string
          name?: string
          unit_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "topics_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      units: {
        Row: {
          ap_points: number
          ap_weight_pct: number
          description: string | null
          id: string
          name: string
          number: number
          subject_id: string
          track: Database["public"]["Enums"]["ap_track"]
        }
        Insert: {
          ap_points: number
          ap_weight_pct: number
          description?: string | null
          id?: string
          name: string
          number: number
          subject_id: string
          track?: Database["public"]["Enums"]["ap_track"]
        }
        Update: {
          ap_points?: number
          ap_weight_pct?: number
          description?: string | null
          id?: string
          name?: string
          number?: number
          subject_id?: string
          track?: Database["public"]["Enums"]["ap_track"]
        }
        Relationships: [
          {
            foreignKeyName: "units_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      user_mistakes: {
        Row: {
          category: string
          code: string
          created_at: string
          description: string
          est_point_loss: number
          example: string | null
          how_to_avoid: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string
          code: string
          created_at?: string
          description?: string
          est_point_loss?: number
          example?: string | null
          how_to_avoid?: string
          id?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          code?: string
          created_at?: string
          description?: string
          est_point_loss?: number
          example?: string | null
          how_to_avoid?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      ap_track: "AB" | "BC"
      app_role: "admin" | "user"
      difficulty: "easy" | "medium" | "hard"
      question_type: "MCQ" | "FRQ"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ap_track: ["AB", "BC"],
      app_role: ["admin", "user"],
      difficulty: ["easy", "medium", "hard"],
      question_type: ["MCQ", "FRQ"],
    },
  },
} as const
