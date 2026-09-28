# Ai api
Google gemini

## Request form
Structured string that takes inputs from user form

- Pick morning, afternoon + evening (or multiple)
- Which meals do you want
- What type(s) of venue - dropdown list (pick multiple)
- No. of children + ages

- *Accessible transport checkbox (extension)*

## Response structure

```
const responseJsonSchema = {
  type: "object",
  properties: {
    venues: {
      type: "array",
      venue: {
        type: "object",
        properties: {
          name: { type: "string", description: "Name of the ingredient."},
          desciption: { type: "string", description: "Quantity of the ingredient, including units."},
          recommended time: { type: "int", description: "Reccomended time at place."}
        },
        required: ["name", "description"]
      }
    },
  },
  required: ["venues"]
};
```