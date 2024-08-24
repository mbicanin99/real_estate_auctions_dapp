import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'description',
  standalone: true
})
export class DescriptionPipes implements PipeTransform{

  public transform(description: string): any {
    switch(description){
      case "Experience the epitome of urban living in this sophisticated downtown apartment. Perfectly situated in the heart of the city, this property offers exquisite design and modern amenities.":
        return 'Experience the epitome of urban living in this sophisticated downtown apartment.'
      case  "Indulge in luxury with this stunning penthouse located in the bustling city center. Enjoy panoramic views, contemporary design, and a lifestyle of elegance and comfort.":
        return "Indulge in luxury with this stunning penthouse located in the bustling city center."
      case  "Escape the city hustle to this charming suburban home. Nestled in a peaceful neighborhood, this property offers a serene retreat with spacious interiors and a lovely outdoor space.":
        return "Escape the city hustle to this charming suburban home. Nestled in a peaceful neighborhood."
      case "Discover tranquility in this suburb retreat. Surrounded by nature and greenery, this property provides a perfect balance between modern living and a peaceful suburban lifestyle.":
        return "Discover tranquility in this suburb retreat. Surrounded by nature and greenery"
    }
  }
}
