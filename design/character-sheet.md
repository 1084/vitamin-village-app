# Vitamin Buddies: character sheet

A brief for drawing the ten buddies, usable as a page per character for an illustrator or as a prompt set for an image model. Every trait comes from what the nutrient does in the body, so the look teaches the fact. Colours are the ones already in the app (`CHARACTERS` in `web/index.html`), so new art drops into the existing badges, story bubbles and the Book without re-theming.

## House style

- Round, soft, toy-like proportions: big head (about 40% of total height), short limbs, no sharp points. Think a friendly 3D-rendered plush rather than a mascot with attitude.
- Flat pastel backgrounds in each buddy's `bg` colour, the character in their `jersey` colour with white accents; outlines in the `ink` colour at about 2 px at 256 px.
- Each buddy wears a plain jersey with their symbol (D, Ca, C…) on the chest, so the symbol never has to be printed beside them.
- Eyes: two large dots with a white highlight; mouth: a simple line. Expressions are made with eyebrows and mouth only, so they stay readable at 40 px.
- No text in the art other than the chest symbol. No food in the pose unless listed.

## Deliverables per buddy

| Asset | Size | Used for |
| --- | --- | --- |
| Badge head-shot | 256 px square, transparent background, face centred | Order cards, the item-info bar, the flash-card flip |
| Bust | 512 px square, chest up, three expressions: waiting, pleased, hungry | Story bubbles, Give reaction, empty-counter idle |
| Full body | 512 x 768 px, standing, neutral pose, one signature prop | The Book, the dining-room window, level-up card |
| Pair pose | 1024 x 512 px, one per pair rule below | The "Best buddies!" moment on a pair order |

File names: `buddy-<id>-badge.png`, `buddy-<id>-bust-waiting.png`, `buddy-<id>-bust-pleased.png`, `buddy-<id>-bust-hungry.png`, `buddy-<id>-full.png`, `pair-<id>_<id>.png` (ids sorted alphabetically as in `RULES`).

## The ten buddies

| id | Name | Nutrient | Symbol | Jersey | Trait (what the nutrient does) | Look and prop | Signature move |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `d` | Sunny | Vitamin D | D | `#E0A93E` gold | Made in sunlight; helps bones grow and lifts mood | Sunglasses pushed up on the head, warm freckles, always squinting happily; prop: a folding sun lounger | Holds doors open for Cal (calcium gets in because of D) |
| `cal` | Cal | Calcium | Ca | `#4E97DD` blue | Builds bones and teeth | Square, sturdy, slightly bigger than the others; hard hat and a tool belt; a big toothy grin | Stacks building blocks into a tall tower |
| `c` | Cece | Vitamin C | C | `#7DB33F` green | Heals cuts, fights sniffles, recharges E | Small and quick, a bandage on one knee, a first-aid satchel; prop: a tiny tissue box | Zips around leaving little sparkle trails; plugs Ella in like a charger |
| `iron` | Ferris | Iron | Fe | `#D96B45` rust-orange | Carries oxygen in the blood for energy | A delivery runner: headband, sneakers, a backpack full of little balloons (the oxygen); always mid-stride | Never stands still; hands Cece a balloon |
| `zinc` | Zenia | Zinc | Zn | `#D75E8A` pink | Growth and fighting germs, heals scrapes | Tall and lanky, a growth-chart ruler as a staff, plasters on her elbows | Measures everyone against her ruler |
| `mag` | Magnus | Magnesium | Mg | `#3BB58C` teal | Relaxes muscles, steady energy, 300+ jobs | Calm, half-closed eyes, sits cross-legged; prop: a clipboard with a long checklist | Breathes out slowly; everyone near him relaxes; nudges Sunny awake |
| `a` | Ava | Vitamin A | A | `#E8963A` amber | Sight and healthy skin | Big round glasses, bright wide eyes; prop: a small telescope or binoculars | Spots things first and points them out |
| `k` | Kaye | Vitamin K2 | K2 | `#8E86E0` lavender | Guides calcium to the bones; helps clotting | A tour-guide: a little flag on a stick, a map tucked under one arm, a confident wave | Leads Cal by the hand to the right place |
| `cop` | Cooper | Copper | Cu | `#B07B4F` copper-brown | Helps the body use iron; colours hair and skin | Ferris's sidekick: smaller, same headband in copper, a little wrench; freckly | Tightens the bolts on Ferris's backpack |
| `e` | Ella | Vitamin E | E | `#D4B24A` yellow-gold | Protects cells like a shield | A round shield on her back, a kind, slightly tired smile; prop: the shield | Raises the shield; runs low on charge until Cece recharges her |

Names and nutrients are already in the app; the jersey colours are the `jersey` values from `CHARACTERS`. Badge `bg` and `ink` colours for each are there too and should be used for the card behind the character.

## Pair poses (from the buddy rules)

| Pair | Verdict | The scene to draw |
| --- | --- | --- |
| Sunny + Cal | Best buddies! | Sunny holds the door of a house (the body) open while Cal walks in carrying blocks |
| Cece + Ferris | Best buddies! | Cece grabs Ferris's hand and pulls him out of a bowl of food |
| Sunny + Magnus | Best buddies! | Magnus gently nudges a dozing Sunny awake on the lounger |
| Cal + Magnus | Good teammates! | Cal builds, Magnus relaxes on the finished wall |
| Ava + Zenia | Best buddies! | Zenia gives Ava a piggy-back so she can see further |
| Ava + Ferris | Best buddies! | Ava points the way, Ferris runs that way |
| Sunny + Kaye | Best buddies! | Sunny opens the door, Kaye waves Cal through with her flag |
| Cal + Kaye | Best buddies! | Kaye leads Cal by the hand along a path to a bone-shaped house |
| Cooper + Ferris | Best buddies! | Cooper tightens Ferris's backpack while Ferris jogs in place |
| Cece + Ella | Best buddies! | Cece plugs a cable into Ella's shield; Ella lights up |

The three "Need some space!" rules (Cal + Ferris, Cal + Zenia, Cooper + Zenia) get no pair art; the game never asks for those pairs together.

## Difficulty switch for the badge

The badge head-shot is drawn without the chest symbol visible (face only). The game can then show either the face alone (harder: the nutrient lives behind the tap) or the face with the symbol overlaid in a corner (easier), from one asset.

## Prompt seed for an image model

> A friendly round cartoon character for a children's nutrition game, soft plush-like 3D render, big head, short limbs, large dot eyes with highlights, simple line mouth, plain `<jersey colour>` jersey with a white "`<symbol>`" on the chest, `<trait look and prop>`, `<expression>`, centered, flat `<bg colour>` background, no text, no food.

Fill the four angle-bracket slots from the table above; keep everything else identical across the ten so the set matches.
