export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      "123": {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      chat_history: {
        Row: {
          content: string | null
          created_at: string
          embedding: string | null
          id: number
          metadata: Json | null
          session_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          embedding?: string | null
          id?: number
          metadata?: Json | null
          session_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          embedding?: string | null
          id?: number
          metadata?: Json | null
          session_id?: string | null
        }
        Relationships: []
      }
      company_profiles: {
        Row: {
          achievements: string | null
          avoid_phrases: string | null
          benefits: string | null
          brand_personality: string | null
          brand_values: string[] | null
          call_to_actions: string[] | null
          company_name: string | null
          created_at: string | null
          email: string | null
          emoji_usage: string | null
          facebook_url: string | null
          first_name: string | null
          id: string
          industry: string | null
          instagram_url: string | null
          language: string | null
          last_name: string | null
          linkedin_url: string | null
          main_problem: string | null
          main_product: string | null
          main_services: string | null
          mission_vision_values: string | null
          position: string | null
          positioning: string | null
          preferred_ctas_style: string | null
          preferred_phrases: string | null
          process_steps: string | null
          product_url: string | null
          sensitive_topics_handling: string | null
          seo_keywords: string | null
          solution: string | null
          target_audience: string | null
          technical_terms: string | null
          tone: string | null
          updated_at: string | null
          use_humor: string | null
          user_id: string | null
          website_url: string | null
          writing_style: string | null
        }
        Insert: {
          achievements?: string | null
          avoid_phrases?: string | null
          benefits?: string | null
          brand_personality?: string | null
          brand_values?: string[] | null
          call_to_actions?: string[] | null
          company_name?: string | null
          created_at?: string | null
          email?: string | null
          emoji_usage?: string | null
          facebook_url?: string | null
          first_name?: string | null
          id?: string
          industry?: string | null
          instagram_url?: string | null
          language?: string | null
          last_name?: string | null
          linkedin_url?: string | null
          main_problem?: string | null
          main_product?: string | null
          main_services?: string | null
          mission_vision_values?: string | null
          position?: string | null
          positioning?: string | null
          preferred_ctas_style?: string | null
          preferred_phrases?: string | null
          process_steps?: string | null
          product_url?: string | null
          sensitive_topics_handling?: string | null
          seo_keywords?: string | null
          solution?: string | null
          target_audience?: string | null
          technical_terms?: string | null
          tone?: string | null
          updated_at?: string | null
          use_humor?: string | null
          user_id?: string | null
          website_url?: string | null
          writing_style?: string | null
        }
        Update: {
          achievements?: string | null
          avoid_phrases?: string | null
          benefits?: string | null
          brand_personality?: string | null
          brand_values?: string[] | null
          call_to_actions?: string[] | null
          company_name?: string | null
          created_at?: string | null
          email?: string | null
          emoji_usage?: string | null
          facebook_url?: string | null
          first_name?: string | null
          id?: string
          industry?: string | null
          instagram_url?: string | null
          language?: string | null
          last_name?: string | null
          linkedin_url?: string | null
          main_problem?: string | null
          main_product?: string | null
          main_services?: string | null
          mission_vision_values?: string | null
          position?: string | null
          positioning?: string | null
          preferred_ctas_style?: string | null
          preferred_phrases?: string | null
          process_steps?: string | null
          product_url?: string | null
          sensitive_topics_handling?: string | null
          seo_keywords?: string | null
          solution?: string | null
          target_audience?: string | null
          technical_terms?: string | null
          tone?: string | null
          updated_at?: string | null
          use_humor?: string | null
          user_id?: string | null
          website_url?: string | null
          writing_style?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          content: string | null
          created_at: string
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          created_at?: string
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      n8n_chat_histories: {
        Row: {
          content: string | null
          created_at: string | null
          embedding: string | null
          id: number
          message: Json
          metadata: Json | null
          session_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          embedding?: string | null
          id?: number
          message: Json
          metadata?: Json | null
          session_id: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          embedding?: string | null
          id?: number
          message?: Json
          metadata?: Json | null
          session_id?: string
        }
        Relationships: []
      }
      n8n_vectors: {
        Row: {
          embedding: string | null
          id: string
          metadata: Json | null
          text: string | null
        }
        Insert: {
          embedding?: string | null
          id?: string
          metadata?: Json | null
          text?: string | null
        }
        Update: {
          embedding?: string | null
          id?: string
          metadata?: Json | null
          text?: string | null
        }
        Relationships: []
      }
      saved_content: {
        Row: {
          content: Json
          content_type: string
          created_at: string
          generation_params: Json | null
          id: string
          is_favorite: boolean
          source_expert: string | null
          title: string
          user_id: string
        }
        Insert: {
          content: Json
          content_type: string
          created_at?: string
          generation_params?: Json | null
          id?: string
          is_favorite?: boolean
          source_expert?: string | null
          title: string
          user_id: string
        }
        Update: {
          content?: Json
          content_type?: string
          created_at?: string
          generation_params?: Json | null
          id?: string
          is_favorite?: boolean
          source_expert?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: unknown
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
