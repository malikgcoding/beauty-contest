# Beauty Contest Game

_A TypeScript implementation of the "Beauty Contest" game from Alice in Borderland._

![Project Banner](https://s2.qwant.com/thumbr/474x237/e/8/61c2e2f6143835ae4ee1134375c7c93c3834fcc1076ae1be09cd87953923bf/th.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%3Fid%3DOIP.0lj1j2q6Uvv99cChdE_vrgHaDt%26pid%3DApi&q=0&b=1&p=0&a=0)

## Table of Contents

- [Getting Started](#getting-started)
- [Game Rules](#game-rules)
- [Languages](#languages)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/malikgcoding/beauty-contest
   cd beauty-contest
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm start
   ```

4. **Open in your browser:**
   Visit [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal).

## Game Rules

1. Each player chooses a number between 0 and 100.
2. The winner is the player whose chosen number is closest to **80% of the average** of all chosen numbers.
3. If there are multiple players equally close, everybody loses one point.
4. If the winner chooses the exact (rounded) correct number, the other players lose two points.
5. If there are two players left, one picks zero and the other picks 100, the one who picked 100 wins.

## Languages

- **TypeScript**
- **HTML5/CSS**
- **JavaScript/NodeJS**
