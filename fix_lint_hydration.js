const fs = require('fs');
let file = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix hydration mismatch: <p> cannot contain <div>
file = file.replace(/element="p"/, 'element="div"');

// Fix unescaped apostrophe: Let's -> Let&apos;s
file = file.replace(/Let's Talk/, "Let&apos;s Talk");

fs.writeFileSync('src/app/page.tsx', file);

// Fix GSAP offset cursor issue: use xPercent, yPercent instead of translate
let cursorFile = fs.readFileSync('src/components/MagneticCursor.tsx', 'utf8');
cursorFile = cursorFile.replace(/className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white pointer-events-none z-\[9999\] mix-blend-difference transform -translate-x-1\/2 -translate-y-1\/2 flex items-center justify-center transition-opacity duration-300"/, 'className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center transition-opacity duration-300"');
// ensure cursor uses xPercent and yPercent to stay centered when GSAP takes over x/y
cursorFile = cursorFile.replace(/scale: scale,/, 'scale: scale, xPercent: -50, yPercent: -50,');

fs.writeFileSync('src/components/MagneticCursor.tsx', cursorFile);
