const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function checkApiHealth() {
  const response = await fetch(`${API_URL}/health`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Backend tidak dapat dihubungi");
  }

  return response.json();
}

export interface ValidationResult {
  valid: boolean;
  message: string;
  checks?: {
    resolution?: {
      passed: boolean;
      width: number;
      height: number;
    };
    face_detection?: {
      passed: boolean;
      face_count: number;
    };
    lighting?: {
      passed: boolean;
      brightness: number;
    };
    sharpness?: {
      passed: boolean;
      score: number;
    };
  };
  errors: string[];
}

export interface SkinDetection {
  class_id: number;
  class_name: string;
  confidence: number;
  bounding_box: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
}

export interface SkinRecommendation {
  title: string;
  description?: string;
  detected_count: number;
  ingredients: string[];
  care_tips: string[];
  avoid: string[];
}

export interface ProductRecommendation {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;

  ingredients: string[];
  skin_types: string[];
  suitable_conditions: string[];

  price: number;

  image_url?: string | null;
  marketplace?: string | null;
  product_url?: string | null;

  is_active: boolean;

  matching_ingredients: string[];
  matching_conditions: string[];
  match_score: number;
}

export interface QuestionnaireAnswers {
  habits: string[];
  skin_type: string;
  current_products: string;
}

export interface QuestionnaireContext {
  skin_type: string;
  habits: string[];
  existing_ingredients: string[];
  notes: string[];
}

export interface SkinAnalysis {
  success: boolean;
  model: string;
  device: string;
  image_width: number;
  image_height: number;
  total_detections: number;

  summary: Record<
    string,
    {
      count: number;
      highest_confidence: number;
    }
  >;

  detections: SkinDetection[];

  recommendations?: SkinRecommendation[];

  product_recommendations?: ProductRecommendation[];

  questionnaire_context?: QuestionnaireContext;
  ingredient_warnings?: string[];
}

export interface AnalysisResponse {
  success: boolean;
  message: string;
  validation: ValidationResult;
  analysis: SkinAnalysis | null;
  disclaimer?: string;
  stage?: string;
}

export async function validateSkinImage(
  image: File,
): Promise<ValidationResult> {
  const formData = new FormData();
  formData.append("file", image);

  const response = await fetch(`${API_URL}/api/analysis/validate`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Gagal memeriksa kualitas foto.");
  }

  return data as ValidationResult;
}

export async function analyzeSkinImage(
  image: File,
  questionnaire: QuestionnaireAnswers,
): Promise<AnalysisResponse> {
  const formData = new FormData();

  formData.append("file", image);
  formData.append("questionnaire", JSON.stringify(questionnaire));

  const response = await fetch(`${API_URL}/api/analysis/analyze`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Gagal melakukan analisis kulit.");
  }

  return data as AnalysisResponse;
}
