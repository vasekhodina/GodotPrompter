---
name: animation-system
description: Use when implementing animations — AnimationPlayer, AnimationTree, blend trees, state machines, sprite animation, and code-driven animation
---

# Animation System in Godot 4.3+

All examples target Godot 4.3+ with no deprecated APIs. GDScript is shown first, then C#.

> **Related skills:** **state-machine** for gameplay state management, **player-controller** for movement that drives animation, **component-system** for reusable animation components, **2d-essentials** for TileMaps, parallax scrolling, 2D lights, and canvas layer organization, **3d-essentials** for AnimationTree and 3D animation blending, **shader-basics** for shader-driven hit flash and dissolve effects, **tween-animation** for code-driven motion alongside keyframe animation.

---

## 1. Core Concepts

### AnimationPlayer vs AnimationTree

| Node              | Use For                                  | Complexity | Notes                                              |
|-------------------|------------------------------------------|------------|----------------------------------------------------|
| `AnimationPlayer` | Simple playback, one-shot effects        | Low        | Play/stop/queue individual clips directly          |
| `AnimationTree`   | Blending, transitions, layered animation | Medium-High| State machines and blend trees for smooth transitions |

**Rule of thumb:** Start with AnimationPlayer. Add AnimationTree when you need blending between animations (walk/run blend, directional movement, layered upper/lower body).

### Animation Workflow

```
1. Create AnimationPlayer node       → holds all animation clips
2. Add tracks in the Animation panel → keyframe properties, methods, audio
3. (Optional) Add AnimationTree      → blend/transition logic
4. Trigger from code                 → play(), travel(), set parameters
```

---

## 2. AnimationPlayer Basics

### Scene Structure

```
Character (CharacterBody2D)
├── Sprite2D
└── AnimationPlayer
```

### Creating Animations

AnimationPlayer can animate **any property** on any sibling or child node:
- Sprite frames, modulate, position, rotation, scale
- Visibility, collision shape disabled state
- Method calls (Call Method track)
- Audio playback (Audio Playback track)

### GDScript — Basic Playback

```gdscript
extends CharacterBody2D

@onready var anim_player: AnimationPlayer = $AnimationPlayer

func _physics_process(delta: float) -> void:
    var input_dir := Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")

    if input_dir != Vector2.ZERO:
        velocity = input_dir * 200.0
        anim_player.play("walk")
    else:
        velocity = Vector2.ZERO
        anim_player.play("idle")

    move_and_slide()
```

### C# — Basic Playback

```csharp
using Godot;

public partial class Character : CharacterBody2D
{
    private AnimationPlayer _animPlayer;

    public override void _Ready()
    {
        _animPlayer = GetNode<AnimationPlayer>("AnimationPlayer");
    }

    public override void _PhysicsProcess(double delta)
    {
        Vector2 inputDir = Input.GetVector("ui_left", "ui_right", "ui_up", "ui_down");

        if (inputDir != Vector2.Zero)
        {
            Velocity = inputDir * 200.0f;
            _animPlayer.Play("walk");
        }
        else
        {
            Velocity = Vector2.Zero;
            _animPlayer.Play("idle");
        }

        MoveAndSlide();
    }
}
```

> Calling `play()` with the same animation name while it's already playing does nothing (no restart). This is safe to call every frame.

### Playback Control

```gdscript
# Play from the beginning
anim_player.play("attack")

# Play backwards
anim_player.play_backwards("attack")

# Queue an animation to play after the current one finishes
anim_player.queue("idle")

# Stop and reset
anim_player.stop()

# Pause / resume
anim_player.pause()
anim_player.play()  # resumes from paused position

# Set playback speed (2x speed)
anim_player.speed_scale = 2.0

# Seek to a specific time
anim_player.seek(0.5)
```

```csharp
_animPlayer.Play("attack");
_animPlayer.PlayBackwards("attack");
_animPlayer.Queue("idle");
_animPlayer.Stop();
_animPlayer.Pause();
_animPlayer.Play();
_animPlayer.SpeedScale = 2.0;
_animPlayer.Seek(0.5);
```

---

## 3. Animation Signals

AnimationPlayer emits useful signals for game logic synchronization.

### GDScript

```gdscript
func _ready() -> void:
    anim_player.animation_finished.connect(_on_animation_finished)

func _on_animation_finished(anim_name: StringName) -> void:
    match anim_name:
        "attack":
            anim_player.play("idle")
        "death":
            queue_free()
```

### C#

```csharp
public override void _Ready()
{
    _animPlayer = GetNode<AnimationPlayer>("AnimationPlayer");
    _animPlayer.AnimationFinished += OnAnimationFinished;
}

private void OnAnimationFinished(StringName animName)
{
    if (animName == "attack")
        _animPlayer.Play("idle");
    else if (animName == "death")
        QueueFree();
}
```

### Method Call Tracks

Add a **Call Method** track to trigger game logic at exact animation frames (spawn projectile at frame 5, play SFX at impact frame, enable hitbox during swing).

In the Animation panel:
1. Add Track → Call Method Track
2. Select the target node
3. Add keyframes at the desired times
4. Set the method name and arguments

```gdscript
# These methods are called by the AnimationPlayer via Call Method tracks
func spawn_projectile() -> void:
    var bullet := preload("res://scenes/bullet.tscn").instantiate()
    get_parent().add_child(bullet)
    bullet.global_position = $Muzzle.global_position

func enable_hitbox() -> void:
    $HitboxArea/CollisionShape2D.disabled = false

func disable_hitbox() -> void:
    $HitboxArea/CollisionShape2D.disabled = true
```

---

## 4. Sprite Frame Animation

### AnimatedSprite2D

For simple frame-by-frame animation without needing property tracks.

```
Character (CharacterBody2D)
├── AnimatedSprite2D
└── (no AnimationPlayer needed)
```

### GDScript

```gdscript
extends CharacterBody2D

@onready var sprite: AnimatedSprite2D = $AnimatedSprite2D

func _physics_process(delta: float) -> void:
    var input_dir := Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")

    if input_dir != Vector2.ZERO:
        velocity = input_dir * 200.0
        sprite.play("walk")
        # Flip sprite based on direction
        if input_dir.x != 0.0:
            sprite.flip_h = input_dir.x < 0.0
    else:
        velocity = Vector2.ZERO
        sprite.play("idle")

    move_and_slide()
```

### C#

```csharp
using Godot;

public partial class Character : CharacterBody2D
{
    private AnimatedSprite2D _sprite;

    public override void _Ready()
    {
        _sprite = GetNode<AnimatedSprite2D>("AnimatedSprite2D");
    }

    public override void _PhysicsProcess(double delta)
    {
        Vector2 inputDir = Input.GetVector("ui_left", "ui_right", "ui_up", "ui_down");

        if (inputDir != Vector2.Zero)
        {
            Velocity = inputDir * 200.0f;
            _sprite.Play("walk");
            if (inputDir.X != 0.0f)
                _sprite.FlipH = inputDir.X < 0.0f;
        }
        else
        {
            Velocity = Vector2.Zero;
            _sprite.Play("idle");
        }

        MoveAndSlide();
    }
}
```

### AnimatedSprite2D vs AnimationPlayer + Sprite2D

| Approach               | Pros                                    | Cons                                          |
|------------------------|-----------------------------------------|-----------------------------------------------|
| `AnimatedSprite2D`     | Quick setup, built-in SpriteFrames editor | Can only animate frames; no property tracks  |
| `AnimationPlayer` + `Sprite2D` | Full property animation, method calls, audio | More setup, need to keyframe region/frame |

**Use AnimatedSprite2D** for simple characters with only frame animations. **Use AnimationPlayer** when you also need to animate hitboxes, particles, sounds, or other properties in sync.

---

## 5. AnimationTree — Blend Trees & State Machines

### Scene Structure

```
Character (CharacterBody2D)
├── Sprite2D
├── AnimationPlayer        ← holds all clips
└── AnimationTree          ← controls blending/transitions
    (tree_root = AnimationNodeStateMachine or AnimationNodeBlendTree)
```

### Setup

1. Add an **AnimationTree** node as a sibling (not child) of AnimationPlayer
2. Set `AnimationTree.anim_player` to point at your AnimationPlayer
3. Set `AnimationTree.active = true`
4. Choose a root node type:
   - **AnimationNodeStateMachine** — for discrete states with transitions (idle, walk, run, jump, attack)
   - **AnimationNodeBlendTree** — for continuous blending (walk/run speed blend, directional movement)

### State Machine Setup

In the AnimationTree editor:
1. Set root to **AnimationNodeStateMachine**
2. Add states (right-click → Add Animation) for each clip
3. Connect states with transitions (drag between nodes)
4. Set transition properties: advance mode (auto/manual), switch time, fade time

### GDScript — State Machine

```gdscript
extends CharacterBody2D

@onready var anim_tree: AnimationTree = $AnimationTree
@onready var state_machine: AnimationNodeStateMachinePlayback = anim_tree["parameters/playback"]

func _physics_process(delta: float) -> void:
    var input_dir := Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")

    if input_dir != Vector2.ZERO:
        velocity = input_dir * 200.0
        state_machine.travel("walk")
    else:
        velocity = Vector2.ZERO
        state_machine.travel("idle")

    move_and_slide()

func attack() -> void:
    # travel() transitions smoothly; use start() for immediate switch
    state_machine.travel("attack")

func get_current_state() -> StringName:
    return state_machine.get_current_node()
```

### C# — State Machine

```csharp
using Godot;

public partial class Character : CharacterBody2D
{
    private AnimationTree _animTree;
    private AnimationNodeStateMachinePlayback _stateMachine;

    public override void _Ready()
    {
        _animTree = GetNode<AnimationTree>("AnimationTree");
        _stateMachine = _animTree.Get("parameters/playback").As<AnimationNodeStateMachinePlayback>();
    }

    public override void _PhysicsProcess(double delta)
    {
        Vector2 inputDir = Input.GetVector("ui_left", "ui_right", "ui_up", "ui_down");

        if (inputDir != Vector2.Zero)
        {
            Velocity = inputDir * 200.0f;
            _stateMachine.Travel("walk");
        }
        else
        {
            Velocity = Vector2.Zero;
            _stateMachine.Travel("idle");
        }

        MoveAndSlide();
    }

    public void Attack()
    {
        _stateMachine.Travel("attack");
    }
}
```

### Blend Tree — Speed Blending

Blend between walk and run based on a speed parameter.

1. Set root to **AnimationNodeBlendTree**
2. Add a **BlendSpace1D** node
3. Add "walk" at position 0.0 and "run" at position 1.0
4. Connect BlendSpace1D → Output

```gdscript
extends CharacterBody2D

@export var walk_speed: float = 100.0
@export var run_speed: float = 250.0

@onready var anim_tree: AnimationTree = $AnimationTree

func _physics_process(delta: float) -> void:
    var input_dir := Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
    var is_running := Input.is_action_pressed("sprint")
    var target_speed := run_speed if is_running else walk_speed

    if input_dir != Vector2.ZERO:
        velocity = input_dir * target_speed
        # Blend parameter: 0.0 = walk, 1.0 = run
        var blend_amount := inverse_lerp(walk_speed, run_speed, velocity.length())
        anim_tree["parameters/BlendSpace1D/blend_position"] = blend_amount
    else:
        velocity = Vector2.ZERO

    move_and_slide()
```

```csharp
using Godot;

public partial class BlendTreeCharacter : CharacterBody2D
{
    [Export] public float WalkSpeed { get; set; } = 100.0f;
    [Export] public float RunSpeed { get; set; } = 250.0f;

    private AnimationTree _animTree;

    public override void _Ready()
    {
        _animTree = GetNode<AnimationTree>("AnimationTree");
    }

    public override void _PhysicsProcess(double delta)
    {
        Vector2 inputDir = Input.GetVector("ui_left", "ui_right", "ui_up", "ui_down");
        bool isRunning = Input.IsActionPressed("sprint");
        float targetSpeed = isRunning ? RunSpeed : WalkSpeed;

        if (inputDir != Vector2.Zero)
        {
            Velocity = inputDir * targetSpeed;
            float blendAmount = Mathf.InverseLerp(WalkSpeed, RunSpeed, Velocity.Length());
            _animTree.Set("parameters/BlendSpace1D/blend_position", blendAmount);
        }
        else
        {
            Velocity = Vector2.Zero;
        }

        MoveAndSlide();
    }
}
```

### BlendSpace2D — Directional Movement

For top-down games with 4/8-directional animations.

1. Add a **BlendSpace2D** node in the blend tree
2. Add animations at compass positions: idle_down (0,1), idle_up (0,-1), idle_right (1,0), idle_left (-1,0)
3. Set blend position from input direction

```gdscript
# Set blend position to input direction
var input_dir := Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
anim_tree["parameters/BlendSpace2D/blend_position"] = input_dir
```

```csharp
Vector2 inputDir = Input.GetVector("ui_left", "ui_right", "ui_up", "ui_down");
_animTree.Set("parameters/BlendSpace2D/blend_position", inputDir);
```

---

## 6. Godot 4.4+ Animation Features

### Animation Markers

Markers (Godot 4.4+) define named points or regions within an animation clip. Use them for subregion loops, section-based playback, and audio-synced events without splitting clips.

```gdscript
# Check if the current animation has passed a marker
@onready var anim_player: AnimationPlayer = $AnimationPlayer

func _process(_delta: float) -> void:
    # AnimationPlayer exposes marker methods:
    if anim_player.current_animation == "attack":
        var pos: float = anim_player.current_animation_position
        # Use markers to define "wind_up", "hit_frame", "recovery" regions
        # Markers are set in the Animation editor (bottom panel)
```

**Setup in the editor:**
1. Open an animation in the Animation panel
2. Right-click the timeline → **Add Marker**
3. Name the marker (e.g., `hit_frame`, `loop_start`)
4. Use markers as reference points in code or for AudioStreamInteractive sync

### LookAtModifier3D (Godot 4.4+)

Procedurally rotates a bone to look at a target. Ideal for head tracking and eye contact without extra animation clips.

```
Character (CharacterBody3D)
├── Skeleton3D
│   └── LookAtModifier3D
│       (bone = "Head", target = ../LookTarget)
└── LookTarget (Marker3D — position at NPC's conversation partner)
```

```gdscript
# Configure LookAtModifier3D in code
@onready var look_at: LookAtModifier3D = $Skeleton3D/LookAtModifier3D

func _ready() -> void:
    look_at.bone_name = "Head"
    look_at.target_node = $"../LookTarget".get_path()
    # Limit rotation to avoid unnatural head angles
    look_at.use_angle_limitation = true
    look_at.symmetry_limitation = deg_to_rad(70.0)  # max 70° turn
    look_at.primary_limit_angle = deg_to_rad(45.0)   # vertical limit

func look_at_player(player: Node3D) -> void:
    $LookTarget.global_position = player.global_position + Vector3(0, 1.5, 0)

func stop_looking() -> void:
    look_at.influence = 0.0  # blend back to animation
```

```csharp
public partial class LookAtExample : CharacterBody3D
{
    private LookAtModifier3D _lookAt;

    public override void _Ready()
    {
        _lookAt = GetNode<LookAtModifier3D>("Skeleton3D/LookAtModifier3D");
        _lookAt.BoneName = "Head";
        _lookAt.TargetNode = GetNode("../LookTarget").GetPath();
        _lookAt.UseAngleLimitation = true;
        _lookAt.SymmetryLimitation = Mathf.DegToRad(70f);
    }

    public void LookAtPlayer(Node3D player)
    {
        GetNode<Marker3D>("../LookTarget").GlobalPosition = player.GlobalPosition + new Vector3(0, 1.5f, 0);
    }

    public void StopLooking() => _lookAt.Influence = 0f;
}
```

### BoneConstraint3D Modifiers (Godot 4.5+)

Godot 4.5 introduces `BoneConstraint3D` — a new base class for skeleton modifiers that operate relative to another bone rather than a world-space target. Three concrete subclasses ship with 4.5:

| Modifier | What it does |
|----------|-------------|
| `AimModifier3D` | Rotates a bone to aim along its primary axis toward a reference bone |
| `CopyTransformModifier3D` | Copies position/rotation/scale from one bone to another (useful for mirroring or binding secondary rigs) |
| `ConvertTransformModifier3D` | Converts between transform spaces — translates, rotates, or scales a bone based on another bone's transform, with remapping |

These complement `LookAtModifier3D` (which targets a world-space `Node3D`). Use `AimModifier3D` when the aim target is itself a bone on the same skeleton.

**Scene structure:**

```
Character (CharacterBody3D)
└── Skeleton3D
    ├── AimModifier3D         ← child of Skeleton3D
    └── CopyTransformModifier3D
```

**AimModifier3D — bone-to-bone aiming:**

```gdscript
@onready var skeleton: Skeleton3D = $Skeleton3D

func _ready() -> void:
    var aim := AimModifier3D.new()
    skeleton.add_child(aim)
    aim.bone_name = "RightArm"           # bone that aims
    aim.target_bone_name = "RightHand"   # bone it aims toward
    aim.primary_rotation_axis = Vector3.RIGHT  # axis to rotate around

    # Limit how far the bone can rotate
    aim.use_angle_limitation = true
    aim.symmetry_limitation = deg_to_rad(90.0)
```

```csharp
public override void _Ready()
{
    var skeleton = GetNode<Skeleton3D>("Skeleton3D");
    var aim = new AimModifier3D();
    skeleton.AddChild(aim);
    aim.BoneName = "RightArm";
    aim.TargetBoneName = "RightHand";
    aim.PrimaryRotationAxis = Vector3.Right;
    aim.UseAngleLimitation = true;
    aim.SymmetryLimitation = Mathf.DegToRad(90f);
}
```

**CopyTransformModifier3D — mirror/bind bones:**

```gdscript
func _ready() -> void:
    var copy := CopyTransformModifier3D.new()
    skeleton.add_child(copy)
    copy.bone_name = "LeftArm"        # bone receiving the transform
    copy.source_bone_name = "RightArm"  # bone being copied
    copy.copy_position = false
    copy.copy_rotation = true
    copy.copy_scale = false
```

```csharp
var copy = new CopyTransformModifier3D();
skeleton.AddChild(copy);
copy.BoneName = "LeftArm";
copy.SourceBoneName = "RightArm";
copy.CopyPosition = false;
copy.CopyRotation = true;
copy.CopyScale = false;
```

> **Note:** API property names were finalized at Godot 4.5 release. If property names differ in your Godot version, verify via the built-in Inspector on the modifier node. See [PR #100984](https://github.com/godotengine/godot/pull/100984) for the authoritative property list.

> **When to use:** Prefer `BoneConstraint3D` subclasses over manual bone transform manipulation in `_process()` — they integrate with the modifier pipeline and respect the animation blend stack.

### IKModifier3D — Full Skeletal IK (Godot 4.6+)

Godot 4.6 adds `IKModifier3D`, a new base class for skeletal inverse kinematics solvers, with eight subclasses covering the most common IK algorithms. These are `SkeletonModifier3D` children of `Skeleton3D` and work alongside other modifiers (e.g., `LookAtModifier3D`).

**Pick the right solver:**

| Solver | Algorithm | Cost | Best for | Joint count | Notes |
|---|---|---|---|---|---|
| `TwoBoneIK3D` | Analytical two-bone | Cheapest | Legs, arms (chain is exactly 2 bones) | Exactly 2 | Fast and exact. Default when the chain is hip→knee→ankle or shoulder→elbow→wrist. |
| `CCDIK3D` | Cyclic Coordinate Descent | Cheap | Tails, tentacles, simple arms | 2–6 joints | Iterative; can twist unnaturally on long chains. Good default for short arms. |
| `FABRIK3D` | Forward And Backward Reaching | Moderate | Spines, longer limbs, natural reach | 3–10 joints | Forward-and-backward reaching; smooth, stable. Best when the chain length is variable. |
| `JacobianIK3D` | Jacobian / pseudo-inverse | Expensive | Overdetermined rigs, robotic arms | Any | Solves a Jacobian per step; most accurate, most CPU. Reserve for cinematic or hero rigs. |
| (4 further subclasses) | Various | Varies | See 4.6 release notes | — | — |

Default to `TwoBoneIK3D` when the chain is exactly 2 bones (the common humanoid case). Use `CCDIK3D` for short non-2-bone chains. Upgrade to `FABRIK3D` when the result twists or overshoots, or when chain length varies. Reach for `JacobianIK3D` only when rig accuracy is the bottleneck of frame quality, not frame time.

**Basic setup — FABRIK arm IK:**

```
Character (CharacterBody3D)
└── Skeleton3D
    └── FABRIK3D
        (bone_chain = ["Shoulder", "Elbow", "Wrist"])
```

```gdscript
@onready var skeleton: Skeleton3D = $Skeleton3D

func _ready() -> void:
    var ik := FABRIK3D.new()
    skeleton.add_child(ik)
    # Define the bone chain from root to tip
    ik.bone_chain = PackedStringArray(["Shoulder", "Elbow", "Wrist"])
    # Set the IK target — a Node3D in the scene
    ik.target_node = $"../IKTarget"
```

```csharp
public override void _Ready()
{
    var skeleton = GetNode<Skeleton3D>("Skeleton3D");
    var ik = new Fabrik3D();
    skeleton.AddChild(ik);
    ik.BoneChain = new string[] { "Shoulder", "Elbow", "Wrist" };
    ik.TargetNode = GetNode("../IKTarget").GetPath();
}
```

#### Recipe: Two-bone arm reach with influence blending (CCDIK3D)

A character reaches for a moving target (a pickup, a held weapon's grip, a button) and blends the IK influence in / out based on distance. The IK modifier is added in the scene editor under the `Skeleton3D`; the script just drives `influence`.

**Scene tree:**

```
Character (Node3D)
├── Skeleton3D
│   ├── (bones: Spine, Shoulder, UpperArm, Forearm, Hand)
│   └── CCDIK3D
│       ├── target_node = NodePath("../../Target")
│       ├── tip_bone = "Hand"
│       └── root_bone = "Shoulder"
└── Target (Node3D)
```

```gdscript
# arm_ik_controller.gd
extends Node3D

@export var target: Node3D
@export var ccdik: CCDIK3D
@export var blend_speed: float = 4.0
@export var reach_range: float = 2.0

var _blend: float = 0.0

func _process(delta: float) -> void:
    var want_ik := target != null and target.global_position.distance_to(global_position) < reach_range
    _blend = move_toward(_blend, 1.0 if want_ik else 0.0, blend_speed * delta)
    ccdik.influence = _blend
```

```csharp
// ArmIKController.cs
using Godot;

public partial class ArmIKController : Node3D
{
    [Export] public Node3D Target { get; set; }
    [Export] public Ccdik3D Ccdik { get; set; }
    [Export] public float BlendSpeed { get; set; } = 4.0f;
    [Export] public float ReachRange { get; set; } = 2.0f;

    private float _blend;

    public override void _Process(double delta)
    {
        bool wantIk = Target != null && Target.GlobalPosition.DistanceTo(GlobalPosition) < ReachRange;
        _blend = Mathf.MoveToward(_blend, wantIk ? 1.0f : 0.0f, BlendSpeed * (float)delta);
        Ccdik.Influence = _blend;
    }
}
```

**Verification:** Move the `Target` node in the editor while the game runs. The hand should chase the target when within 2 m, and return to the keyframed pose when out of range. Watch `CCDIK3D.influence` ramp 0 → 1.

#### Recipe: Foot placement on uneven terrain (FABRIK3D + raycast)

The character's feet plant on the ground regardless of slope. One `FABRIK3D` per leg (or `TwoBoneIK3D` for exactly-2-bone humanoid legs), plus a per-leg raycast to find the ground hit point.

**Scene tree (per leg):**

```
Character (Node3D)
├── Skeleton3D
│   ├── (bones: Hip, ThighL, ShinL, FootL)
│   └── FABRIK3D_L
│       ├── target_node = NodePath("../../FootTarget_L")
│       ├── tip_bone = "FootL"
│       └── root_bone = "Hip"
├── FootTarget_L (Node3D)   # IK target driven by raycast
└── RayCast3D_L (RayCast3D) # downward ray from foot bone position
```

```gdscript
# foot_ik.gd
extends Node3D

@export var skeleton: Skeleton3D
@export var foot_bone: String = "FootL"
@export var ray: RayCast3D
@export var foot_target: Node3D
@export var max_offset: float = 0.4  # how high/low the foot can plant

func _process(_delta: float) -> void:
    if skeleton == null or ray == null or foot_target == null:
        return
    var bone_idx := skeleton.find_bone(foot_bone)
    var bone_xform := skeleton.global_transform * skeleton.get_bone_global_pose(bone_idx)
    ray.global_position = bone_xform.origin + Vector3.UP * 0.5
    ray.target_position = Vector3.DOWN * (0.5 + max_offset)
    if ray.is_colliding():
        foot_target.global_position = ray.get_collision_point()
    else:
        foot_target.global_position = bone_xform.origin
```

```csharp
// FootIK.cs
using Godot;

public partial class FootIK : Node3D
{
    [Export] public Skeleton3D Skeleton { get; set; }
    [Export] public string FootBone { get; set; } = "FootL";
    [Export] public RayCast3D Ray { get; set; }
    [Export] public Node3D FootTarget { get; set; }
    [Export] public float MaxOffset { get; set; } = 0.4f;

    public override void _Process(double delta)
    {
        if (Skeleton == null || Ray == null || FootTarget == null)
            return;

        int boneIdx = Skeleton.FindBone(FootBone);
        Transform3D boneXform = Skeleton.GlobalTransform * Skeleton.GetBoneGlobalPose(boneIdx);
        Ray.GlobalPosition = boneXform.Origin + Vector3.Up * 0.5f;
        Ray.TargetPosition = Vector3.Down * (0.5f + MaxOffset);

        if (Ray.IsColliding())
            FootTarget.GlobalPosition = Ray.GetCollisionPoint();
        else
            FootTarget.GlobalPosition = boneXform.Origin;
    }
}
```

**Verification:** Place the character on a slope or staircase. Both feet should plant on the ground polygons rather than floating or clipping. Toggle `FABRIK3D.influence` between 0 and 1 to compare.

**Perf cost:** One raycast and one `FABRIK3D` per leg every frame. Two-leg humanoid → 2 raycasts + 2 IK solves. For background NPCs, gate this behind a distance check or run on `_physics_process` at 30 Hz instead of `_process`. For exactly-2-bone humanoid legs, `TwoBoneIK3D` solves in roughly half the time of `FABRIK3D`.

> **Note:** `IKModifier3D` was introduced in Godot 4.6 beta 1 and is still being finalized. Property names, subclass count, and C# binding names may change before the stable release. The C# names here follow Godot's standard binding convention (acronyms PascalCased: `Fabrik3D`, `Ccdik3D`, `JacobianIk3D`, `TwoBoneIk3D`) — verify against your local 4.6 build before relying on them. See the [4.6 release announcement](https://godotengine.org/article/dev-snapshot-godot-4-6-beta-1/) for details.

> **When to use:** `IKModifier3D` subclasses replace custom IK scripts and third-party IK plugins. Use `TwoBoneIK3D` for leg/arm IK (fastest, exact), `FABRIK3D` for longer chains and natural-looking reach, `CCDIK3D` for tentacles or tails.

### SpringBoneSimulator3D (Godot 4.4+)

Simulates spring physics on bones — hair, capes, tails, antennas bounce and sway procedurally.

```
Character (CharacterBody3D)
├── Skeleton3D
│   └── SpringBoneSimulator3D
│       (configure bone chains in Inspector)
```

**Setup:**
1. Add `SpringBoneSimulator3D` as child of `Skeleton3D`
2. In Inspector → **Settings** → **Add Spring Bone**
3. Select the root bone of the chain (e.g., `Hair_Root` or `Tail_01`)
4. Configure `End Bone` (last bone in chain)
5. Tune physics: `Stiffness`, `Damping`, `Gravity`

| Property | Effect |
|----------|--------|
| `Stiffness` | How strongly the bone returns to rest (higher = stiffer) |
| `Damping` | How quickly oscillations settle (higher = less bouncy) |
| `Gravity` | Downward pull on the chain |
| `Drag` | Air resistance (slows movement) |

> **Tip:** Start with Stiffness 5.0, Damping 0.5, Gravity 1.0 for hair. Increase Stiffness to 15+ for stiff antennas.

### Animation Retargeting on Import (Godot 4.3+)

Godot 4.3 can retarget animations from one skeleton to another during `.glb`/`.gltf` import. Use this to share a library of animations across differently-proportioned characters.

**Setup:**
1. In the Import dock for a `.glb` file, expand **Animation**
2. Enable **Retarget** and assign a `SkeletonProfile` (e.g., `SkeletonProfileHumanoid`)
3. Map source skeleton bones to the profile's bone names
4. Re-import — animations now target the profile's generic bone names
5. Any skeleton using the same `SkeletonProfile` can play these animations

---

## 7. Common Animation Recipes

### Hit Flash

Flash the sprite white on damage using a shader or modulate.

#### GDScript

```gdscript
# Simple modulate flash — no shader needed
@onready var _sprite: Sprite2D = $Sprite2D

func flash_hit() -> void:
    var tween := create_tween()
    tween.tween_property(_sprite, "modulate", Color(3.0, 3.0, 3.0, 1.0), 0.05)
    tween.tween_property(_sprite, "modulate", Color.WHITE, 0.1)
```

#### C#

```csharp
private Sprite2D _sprite = null!;

public override void _Ready()
{
    _sprite = GetNode<Sprite2D>("Sprite2D");
}

public void FlashHit()
{
    var tween = CreateTween();
    tween.TweenProperty(_sprite, "modulate", new Color(3f, 3f, 3f, 1f), 0.05);
    tween.TweenProperty(_sprite, "modulate", Colors.White, 0.1);
}
```

### Hit Flash with Shader (GDScript)

For a true white flash that overrides the sprite texture:

```gdscript
# Attach this shader to the Sprite2D material:
# shader_type canvas_item;
# uniform float flash_amount : hint_range(0.0, 1.0) = 0.0;
# void fragment() {
#     vec4 tex = texture(TEXTURE, UV);
#     COLOR = mix(tex, vec4(1.0, 1.0, 1.0, tex.a), flash_amount);
# }

func flash_hit() -> void:
    var mat: ShaderMaterial = $Sprite2D.material
    var tween := create_tween()
    tween.tween_property(mat, "shader_parameter/flash_amount", 1.0, 0.05)
    tween.tween_property(mat, "shader_parameter/flash_amount", 0.0, 0.15)
```

### Attack Combo (GDScript)

Chain attacks within a buffer window.

```gdscript
extends CharacterBody2D

@onready var anim_player: AnimationPlayer = $AnimationPlayer

var _combo_step: int = 0
var _combo_window: bool = false  # Set true via Call Method track near end of each attack

func _unhandled_input(event: InputEvent) -> void:
    if event.is_action_pressed("attack"):
        if _combo_step == 0:
            _start_combo()
        elif _combo_window:
            _advance_combo()

func _start_combo() -> void:
    _combo_step = 1
    anim_player.play("attack_1")

func _advance_combo() -> void:
    _combo_step += 1
    _combo_window = false
    if _combo_step <= 3:
        anim_player.play("attack_%d" % _combo_step)
    else:
        _reset_combo()

# Called by Call Method track in each attack animation
func open_combo_window() -> void:
    _combo_window = true

func _reset_combo() -> void:
    _combo_step = 0
    _combo_window = false

func _on_animation_finished(anim_name: StringName) -> void:
    if anim_name.begins_with("attack"):
        _reset_combo()
        anim_player.play("idle")
```

### Screen Shake on Impact (GDScript)

```gdscript
# On the Camera2D node
func shake(intensity: float = 5.0, duration: float = 0.2) -> void:
    var tween := create_tween()
    for i in int(duration / 0.03):
        var random_offset := Vector2(
            randf_range(-intensity, intensity),
            randf_range(-intensity, intensity)
        )
        tween.tween_property(self, "offset", random_offset, 0.03)
    tween.tween_property(self, "offset", Vector2.ZERO, 0.03)
```

---

## 8. Common Pitfalls

| Symptom                            | Cause                                            | Fix                                                                 |
|------------------------------------|--------------------------------------------------|---------------------------------------------------------------------|
| Animation snaps instead of blending | Using `AnimationPlayer.play()` instead of AnimationTree | Switch to AnimationTree with state machine or blend tree           |
| AnimationTree does nothing          | `active` property is `false`                     | Set `anim_tree.active = true` in Inspector or `_ready()`           |
| `travel()` doesn't transition       | No transition path between states                | Add transition arrows in the AnimationTree state machine editor    |
| Animation plays but sprite doesn't change | Track targets wrong node path              | Verify the track's node path matches the actual scene tree         |
| Method call track doesn't fire      | Method name typo or wrong target node            | Check the track's node path and method name match exactly          |
| Blend parameters have no effect     | Wrong parameter path string                      | Use `"parameters/<NodeName>/blend_position"` — check in Inspector  |
| Animation resets to frame 0 every physics frame | Calling `play()` every frame on a non-looping clip | Guard with `if anim_player.current_animation != "name"`       |

---

## 9. Implementation Checklist

- [ ] AnimationPlayer is a direct child of the animated node (not nested deeper)
- [ ] All animation track node paths are valid (no broken references after scene restructuring)
- [ ] AnimationTree `active` is set to `true` and `anim_player` points to the correct AnimationPlayer
- [ ] State machine transitions have appropriate fade times (0.1–0.2s for responsive gameplay)
- [ ] Looping animations (idle, walk, run) have loop mode set to **Loop** in the Animation panel
- [ ] One-shot animations (attack, jump, death) have loop mode set to **None**
- [ ] Call Method tracks are used for gameplay events (hitbox enable/disable, spawn projectiles, play SFX)
- [ ] Blend parameters are set from gameplay code every frame (not just on state change)
- [ ] `animation_finished` signal is connected for one-shot animations that need follow-up logic
- [ ] Head/eye tracking uses `LookAtModifier3D` instead of manual bone rotation (Godot 4.4+)
- [ ] Hair, capes, and tails use `SpringBoneSimulator3D` instead of custom physics scripts (Godot 4.4+)
- [ ] Shared animation libraries use retargeting with `SkeletonProfileHumanoid` (Godot 4.3+)
- [ ] Bone-to-bone aim/copy constraints use `AimModifier3D` / `CopyTransformModifier3D` instead of manual bone transform code (Godot 4.5+)
- [ ] Arm/leg IK uses `IKModifier3D` subclasses (`TwoBoneIK3D` for two-bone limbs, `FABRIK3D` for longer chains) rather than custom IK scripts (Godot 4.6+)
