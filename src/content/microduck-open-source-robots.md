# What the MicroDuck actually gives you for $399

![A carved wooden tableau on a dark chalkboard: a small carved biped robot on the left faces an identical carved robot on the right, which stands on a shallow plinth as if in a separate space; between them a small carved wooden token rests in a pool of light.](/images/microduck-open-source-robots-lead.png)

*Illustration: A carved robot and its carved simulated twin, separated by a step in the light. An explanatory illustration of the sim-to-real training idea, not a photograph of a product.*

On October 21, 2026, at NVIDIA's GTC Berlin keynote, CEO Jensen Huang stood with four small two-legged robots arrayed in front of him. He asked them to sit, then to stand; on his command, three toppled over and lay on their backs. He asked for a somersault, laughed as a couple of them rolled, and coaxed one back upright. By the next day, video of the demonstration had gone viral — and the robots, called Microducks, were being called a possible "hottest toy for Christmas."

The Microduck is real, and it is worth understanding apart from the viral moment, because it is a working example of an idea Orange Tomato cares about: an agent trained in simulation that then has to work in the real world. But the story around it also contains claims that are weaker than they look — a preorder count built on a single tweet, a delivery timeline that the maker's store currently contradicts, and an ownership story that is more complicated than "now an NVIDIA company."

## What it actually is

The Microduck is a small biped robot built by Pollen Robotics (now part of Hugging Face). It stands about 25 cm tall and weighs about 800 g. Inside it packs 15 motors, a front camera, a small LiDAR, two inertial measurement units, and an articulated beak that can pick up light objects. It runs on a Rockchip RK3566 with an AI accelerator, and it ships with a gamepad.

Out of the box it can walk, sit and stand, kick a ball, grab things, get back up after being knocked over, and — with wheels attached — roller-skate. Pollen lists seven trained moves "in the box," and each of those is a neural policy you can inspect and retrain.

The preorder price is $399 before taxes and shipping (listed as €340 in the EU store). It comes in four colorways: Cream, Graphite, Lavender, and Sky.

## The part that is genuinely interesting: open source and sim-to-real

![Diagram: a policy is trained in simulation, exported to ONNX, and deployed on the real robot; the sim-to-real step is the hard part. The method is documented and open, not independently tested here.](/diagrams/microduck-sim-to-real.svg?v=2)

The Microduck's software is open source under the Apache-2.0 license. The main repository, `pollen-robotics/microduck`, is described as "the duck's brain": the daemons that run a 50 Hz control loop, drive the fifteen servos from neural policies, handle the radios and camera, and manage software updates. A second repository, `pollen-robotics/microduck_rl`, contains the reinforcement-learning training environment.

The key claim is that behaviors are trained in simulation and then deployed onto the real robot — the "sim-to-real" recipe. The training uses the MuJoCo physics simulator and PPO, and the trained policy is exported to ONNX, which the robot loads. The GitHub README describes this explicitly: "MuJoCo and PPO, the sim2real recipe, and the export to ONNX." NVIDIA and Hugging Face also published a tutorial showing the same workflow with Isaac Lab 3.0: train a walking policy in simulation, export it as ONNX, and deploy it on a real robot.

This is the part that earns the attention. A small, affordable, open robot whose policies you can train yourself and share with a community is a meaningful, inspectable example of embodied AI. It is also worth stating the limits: what is verified here is the documented method and the open code. Orange Tomato did not buy a robot or run a hands-on test, so we cannot independently confirm that a newly trained policy performs as well in the real world as in simulation — that is exactly the hard part of sim-to-real.

## Where the viral narrative is weaker than it looks

Not everything in the viral story holds up equally.

**The "20,000 preorders" figure.** TechCrunch reports that preorders surpassed 20,000 units "by the next day," citing a tweet from Hugging Face CEO Clem Delangue. That count comes from a single tweet, quoted by a single article; we could not retrieve the tweet directly or find an independent confirmation. Treat it as a company claim, not an independently verified number.

**The "now an NVIDIA company" framing.** The viral coverage says Pollen (and thus the Microduck) is "now an Nvidia company," because "the GPU giant bought Hugging Face in September." The public record tells a more careful story. On September 2, 2026, NVIDIA filed a Form 8-K stating it had entered a definitive agreement to acquire Hugging Face for about $11.9 billion plus an employee retention program of up to about $1 billion — and that the transaction is expected to close in the first half of 2027, subject to regulatory approvals. In other words, as of this writing the deal is signed but not closed. The Microduck is today a Pollen / Hugging Face product, not yet an NVIDIA one.

**The "in time for Christmas" delivery.** TechCrunch speculates the robots could arrive in time for Christmas. The Pollen store currently shows a different story: a banner states that current pre-orders will ship after April 2027. Delivery timing is changing, so check the store again before relying on it.

## What this means for you

If you are considering the Microduck, here is what the evidence supports today:

- It is a real, small, open-source-in-software robot with a genuine training workflow — you can retrain policies and share them. This is unusual at this price point.
- The $399 preorder price is current, but shipping is far out (currently after April 2027), so plan for a long wait.
- The "NVIDIA company" framing is premature; treat it as a Hugging Face / Pollen product for now.
- Before ordering, verify the current availability and delivery date on the store, and decide how much the open-source promise matters to you — the software is open, but we did not verify whether the full hardware design files are open too.

## The bounded answer

The Microduck is a genuine, affordable, open-source robotics platform whose sim-to-real training story is real and inspectable. What is less solid is the hype surrounding it: the preorder count is single-sourced, the delivery timeline is in flux, and the ownership story is a signed-but-not-closed acquisition. If you want to learn embodied AI by training and sharing robot policies, the Microduck is a credible candidate — just don't buy the viral framing along with it.

## Sources and method

Desk research, sources accessed 26 October 2026. No hardware was purchased or tested. Price and delivery details are snapshots and will change; the preorder count is a single, company-sourced figure.

**Primary documents**

- Pollen Robotics: [Microduck product page](https://pollen-robotics.com/microduck/); [store preorder](https://store.pollen-robotics.com/products/microduck).
- GitHub: [pollen-robotics/microduck](https://github.com/pollen-robotics/microduck); [pollen-robotics/microduck_rl](https://github.com/pollen-robotics/microduck_rl).
- Hugging Face: [pollen-robotics/microduck-policies](https://huggingface.co/pollen-robotics/microduck-policies).
- NVIDIA: [Form 8-K, 2 September 2026](https://www.sec.gov/Archives/edgar/data/1045810/000104581026000078/nvda-20260902.htm) (definitive agreement to acquire Hugging Face; expected to close first half 2027).

**Reporting**

- TechCrunch: [Hottest toy for Christmas? Nvidia CEO plays with adorable Microduck robots, 20,000 sell](https://techcrunch.com/2026/10/23/hottest-toy-for-christmas-nvidia-ceo-plays-with-adorable-microduck-robots-20000-sell/), Julie Bort, 23 October 2026.
- TechEBlog: [Microduck Robots Waddle, Stumble, and Recover During Jensen Huang's GTC Berlin Keynote](https://www.techeblog.com/microduck-robots-jensen-huang-gtc-berlin-keynote/), Jackson Chung, 22 October 2026.
- NVIDIA / Hugging Face: [Microduck with Isaac Lab 3.0](https://huggingface.co/blog/nvidia/microduck-isaac-lab-sim-to-real), 21 October 2026.

The 20,000-preorder figure and the "in time for Christmas" delivery claim come from the TechCrunch report and rest on a single tweet by Hugging Face CEO Clem Delangue, which could not be independently retrieved or confirmed. The "NVIDIA company" framing conflicts with the SEC 8-K, which records a definitive agreement that has not yet closed.
