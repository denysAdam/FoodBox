
export interface TotalNutrients {
    ENERC_KCAL?: { label: string; quantity: number; unit: string };
    PROCNT?: { label: string; quantity: number; unit: string };
    FAT?: { label: string; quantity: number; unit: string };
    CHOCDF?: { label: string; quantity: number; unit: string };
    [key: string]: { label: string; quantity: number; unit: string } | undefined;
}
export interface Recipe {
    label: string;
    image: string;
    url: string;
    ingredientLines?: string[];
    calories: number;
    totalNutrients: TotalNutrients;
    healthLabels?: string[];
}

interface Hit {
    recipe: Recipe;
}


interface ApiResponse {
    hits: Hit[];
}

export async function fetchRecipes(url: string): Promise<ApiResponse | undefined> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: ApiResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}