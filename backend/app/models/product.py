from pydantic import BaseModel
from typing import Optional


class SkincareProduct(BaseModel):
    id: str
    name: str
    brand: str
    category: str
    description: str

    ingredients: list[str]
    skin_types: list[str]
    suitable_conditions: list[str]

    price: int

    image_url: Optional[str] = None
    marketplace: Optional[str] = None
    product_url: Optional[str] = None

    is_active: bool = True