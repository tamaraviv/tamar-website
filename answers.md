# Answers

Answer the questions below in this file, under each question. Put screenshots in
a `screenshots/` folder and link them from your answers.

## 1. Challenges and dilemmas

List at list 2 challenges or dilemmas that you faced while building the design in Part 1,
and how you decided to solve them?

**Answer:**

### Challenge 1: Right-to-Left (RTL) Layout and Mobile Navigation Positioning
- **The Dilemma:** Building a Hebrew website requires a proper RTL (Right-to-Left) flow. On desktop, the site title (`אתר אינטרנט`) belongs on the right (start) and the navigation links (`דף הבית`, `אלמנטים`, `הקורס`) on the left (end). On mobile, the hamburger button needed to appear on the opposite side of the brand title, and the mobile drawer's close icon (`close.svg`) needed to align to the top-left corner, matching the design mockups.
- **How I Solved It:** I set `dir="rtl"` and `lang="he"` on the root `<html>` element and utilized CSS Flexbox with logical alignment (`justify-content: space-between`). To ensure the dark SVG icon asset (`/icons/menu.svg`) appeared crisp white against the blue header background without altering the source asset on disk, I styled it with `filter: brightness(0) invert(1)`. For the mobile overlay, I positioned the close button at `top: 1.5rem; left: 1.5rem;` with its natural dark SVG fill, perfectly recreating the course reference mockup.

### Challenge 2: Smooth CSS Transitions for the Mobile Menu with Accessibility
- **The Dilemma:** Toggling a menu between `display: none` and `display: block` creates an abrupt, non-animated pop, which fails the requirement for smooth CSS transitions. However, simply using `opacity` can leave interactive elements tabbable or clickable while invisible.
- **How I Solved It:** I combined `transform: translateY(-100%)`, `opacity: 0`, and `visibility: hidden` with a smooth easing transition:
  ```css
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              visibility 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  ```
  When the menu opens (`.is-open`), `visibility: visible`, `opacity: 1`, and `transform: translateY(0)` slide and fade the menu in seamlessly. To ensure accessibility, the JavaScript updates `aria-expanded` and `aria-hidden`, locks background scrolling with `document.body.style.overflow = 'hidden'`, and allows closing the menu using the `Escape` key or by clicking any link.

---

## 2. Box model

Build the `.hello-world` example from the lesson 1 "CSS Box Model" slides, exactly as it appears
there, on a new page of your website. This page is only for answering questions
2 and 4, so it can be a temporary file, and you don't need to submit it.

Inspect the element with your browser's devtools.
Enable and disable `box-sizing: border-box;` and inspect the size of the element.
What is the total width, and why? Explain in detail.

**Answer:**

In the CSS Box Model, every rendered HTML element is composed of four concentric rectangles: **Content**, **Padding**, **Border**, and **Margin**.

### 1. When `box-sizing: content-box` (Browser Default without reset):
- In `content-box`, the CSS `width` and `height` properties apply **only to the content box** inside the element.
- Any padding and border specified in CSS are added **outside/in addition to** the width:
  $$\text{Total Rendered Width} = \text{width} + \text{padding-left} + \text{padding-right} + \text{border-left} + \text{border-right}$$
- For example, if `.hello-world` has `width: 200px`, `padding: 20px`, and `border: 5px solid black`:
  $$\text{Total Width} = 200\text{px} + 20\text{px} + 20\text{px} + 5\text{px} + 5\text{px} = 250\text{px}$$
- The element expands larger than the specified 200px, which often causes unexpected horizontal scrollbars or breaks multi-column layouts.

### 2. When `box-sizing: border-box` (Modern Standard / reset.css):
- In `border-box`, the CSS `width` property determines the **total width of the element including content, padding, and border**:
  $$\text{Total Rendered Width} = \text{width} = 200\text{px}$$
- The browser automatically shrinks the inner content area to accommodate the padding and borders:
  $$\text{Content Width} = \text{width} - (\text{padding} + \text{border}) = 200\text{px} - 50\text{px} = 150\text{px}$$
- This makes sizing predictable and component-driven, which is why modern CSS resets (like `styles/reset.css`) set `box-sizing: border-box` on all elements using `*, *::before, *::after`.

---

## 3. The viewport

Open the website on a mobile browser, or in the mobile view of Chrome's
devtools, then delete this line from the `<head>` of `index.html`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

What happens to your page? What does
this line tell the browser, and why does removing it affect your mobile design?

**Answer:**

### What does this line tell the browser?
The `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` tag instructs the mobile browser's layout engine to:
1. `width=device-width`: Match the virtual viewport width to the device's actual physical screen width in CSS pixels (e.g., 375px or 390px on an iPhone, 412px on Android).
2. `initial-scale=1.0`: Render the page at a 1:1 scale without arbitrary zooming when first loaded.

### What happens when you remove it?
1. **Fallback to Virtual Desktop Viewport:**
   When the viewport meta tag is removed, mobile browsers assume the webpage is an old desktop-only website. To prevent the layout from looking broken, the browser renders the page inside a virtual 980px desktop viewport.
2. **Tiny, Zoomed-Out Scaling:**
   The browser then shrinks and scales the entire 980px canvas down to fit onto the 375px/412px physical screen. Everything appears microscopic: the text is illegible without pinching to zoom, and buttons become virtually impossible to tap accurately with a finger.
3. **Media Queries Break:**
   Because the browser considers the viewport width to be 980px, responsive media queries like `@media (max-width: 768px)` will **never trigger** on a mobile phone. The mobile menu icon will not appear, and the full desktop layout will be forced into a tiny, shrunken view.
