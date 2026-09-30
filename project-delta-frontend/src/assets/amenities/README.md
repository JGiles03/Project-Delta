# Child & Me icon pack

This pack contains the Child & Me logo and matching amenity icons. All assets are SVG files with a pale-aqua background and deep-teal rounded linework.

## Files

- `child-and-me-logo.svg`
- `accessible-entrance.svg`
- `accessible-toilet.svg`
- `prams-allowed.svg`
- `pram-storage.svg`
- `changing-facilities.svg`
- `table-reservation.svg`
- `breastfeeding-friendly.svg`
- `childrens-activities.svg`
- `parking.svg`
- `high-chairs.svg`

## React usage

Copy the SVG files into `src/assets/icons/`, then import an icon:

```tsx
import changingIcon from "../../assets/icons/changing-facilities.svg";

<img src={changingIcon} alt="Changing facilities" className="amenity-icon" />
```

Suggested CSS:

```css
.amenity-icon {
  width: 3rem;
  height: 3rem;
}
```
