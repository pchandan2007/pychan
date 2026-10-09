import { Lesson } from '../types';

export const LESSONS: Lesson[] = [
  // Chapter 1: The Whispering Glade
  {
    id: 'lesson-1-1',
    chapterId: 'chap-1',
    title: 'The Spark of Code: Variables & Printing',
    summary: 'Master the core building blocks: print statements, variables, and Python fundamental types (str, int, float, bool).',
    estimatedMinutes: 5,
    xp: 50,
    sections: [
      {
        title: 'Printing to the Console',
        content: 'In Python, the `print()` function is your magical window to communicate with the world. Whatever you pass inside the parentheses will be displayed on screen.',
        codeExample: `print("Welcome to PyQuest!")
print(42)
print("Hero Level:", 1)`,
        outputExample: `Welcome to PyQuest!
42
Hero Level: 1`,
        tip: 'Text in Python must be wrapped in matching quotation marks (single or double quotes are both valid).'
      },
      {
        title: 'Variables: Your Magical Storage Chests',
        content: 'Variables store values so you can reference and manipulate them later. You assign a value to a variable name using the `=` symbol.',
        codeExample: `hero_name = "Aria"
player_level = 1
health_points = 95.5
is_alive = True

print(hero_name, "is Level", player_level)`,
        outputExample: `Aria is Level 1`,
        tip: 'In Python, variable names use snake_case (lowercase letters with underscores separating words).'
      },
      {
        title: 'The Four Fundamental Types',
        content: '1. `str` (String): Text like `"Fireball"`\n2. `int` (Integer): Whole numbers like `10`, `-4`\n3. `float` (Float): Decimal numbers like `3.14`, `0.5`\n4. `bool` (Boolean): Truth values `True` or `False` (capitalized!)',
        codeExample: `gold = 250        # int
tax_rate = 0.05   # float
title = "Ranger"  # str
in_guild = True   # bool

print(type(gold))`,
        outputExample: `<class 'int'>`,
      }
    ],
    quiz: {
      question: 'Which of the following is a valid Python boolean value?',
      options: ['true', 'True', '"True"', '1.0'],
      correctIndex: 1,
      explanation: 'In Python, booleans must start with an uppercase letter: True or False.'
    }
  },
  {
    id: 'lesson-1-2',
    chapterId: 'chap-1',
    title: 'Arcane Arithmetic: Operators & Math',
    summary: 'Perform computations using Python math operators: +, -, *, /, //, %, and **.',
    estimatedMinutes: 6,
    xp: 50,
    sections: [
      {
        title: 'Basic Arithmetic Operators',
        content: 'Python can be used as a supercharged calculator. Addition (+), subtraction (-), and multiplication (*) work naturally.',
        codeExample: `mana_potion = 30
healing_potion = 50
total = mana_potion + healing_potion

damage = 15 * 3  # 45
print("Total Potions:", total)
print("Triple Strike Damage:", damage)`,
        outputExample: `Total Potions: 80
Triple Strike Damage: 45`,
      },
      {
        title: 'True Division (/) vs Floor Division (//)',
        content: 'Division `/` always returns a decimal `float`. Floor division `//` divides and rounds down to the nearest whole integer.',
        codeExample: `print(10 / 3)   # 3.3333333333333335 (float)
print(10 // 3)  # 3 (integer)
print(7 // 2)   # 3`,
        outputExample: `3.3333333333333335
3
3`,
        tip: 'Use // whenever you want equal portions without fractions, like dividing gold coins among players.'
      },
      {
        title: 'Modulo (%) and Exponents (**)',
        content: 'The modulo operator `%` gives the remainder of a division. The exponent operator `**` raises a number to a power.',
        codeExample: `print(10 % 3)   # 1 (because 10 = 3*3 + 1)
print(14 % 5)   # 4
print(2 ** 3)   # 8 (2 cubed: 2 * 2 * 2)`,
        outputExample: `1
4
8`,
        tip: 'Modulo is perfect for checking if a number is even or odd: `num % 2 == 0` is even!'
      }
    ],
    quiz: {
      question: 'What is the result of evaluating `17 // 5` in Python?',
      options: ['3.4', '3', '2', '4'],
      correctIndex: 1,
      explanation: '17 divided by 5 is 3 with remainder 2. Floor division // drops the remainder and gives 3.'
    }
  },

  // Chapter 2: The Crossroads of Logic
  {
    id: 'lesson-2-1',
    chapterId: 'chap-2',
    title: 'The Scales of Truth: Comparisons & Logic',
    summary: 'Evaluate comparisons and combine multiple truth values using and, or, and not.',
    estimatedMinutes: 6,
    xp: 50,
    sections: [
      {
        title: 'Comparison Operators',
        content: 'Comparison operators compare two values and produce a boolean (`True` or `False`).\n- `==` : Equals\n- `!=` : Not equal\n- `<` , `>` : Less than, Greater than\n- `<=`, `>=` : Less than or equal, Greater than or equal',
        codeExample: `score = 100
print(score == 100) # True
print(score != 50)  # True
print(score < 50)   # False`,
        outputExample: `True
True
False`,
        tip: 'Watch out! A single `=` assigns a variable, while double `==` checks for equality.'
      },
      {
        title: 'Logical Operators: and, or, not',
        content: '- `and` : True only if BOTH conditions are True\n- `or`  : True if AT LEAST ONE condition is True\n- `not` : Inverts a boolean (True becomes False, False becomes True)',
        codeExample: `has_key = True
mana = 40

can_cast = has_key and (mana >= 25)
print("Can cast spell:", can_cast)

is_exhausted = False
print("Ready to fight:", not is_exhausted)`,
        outputExample: `Can cast spell: True
Ready to fight: True`,
      }
    ],
    quiz: {
      question: 'What is the result of `(5 > 3) and (2 > 10)`?',
      options: ['True', 'False', 'None', 'Error'],
      correctIndex: 1,
      explanation: '5 > 3 is True, but 2 > 10 is False. Since `and` requires both sides to be True, the overall result is False.'
    }
  },
  {
    id: 'lesson-2-2',
    chapterId: 'chap-2',
    title: 'The Forked Path: If, Elif, and Else',
    summary: 'Direct the flow of your program with conditional statements and indented code blocks.',
    estimatedMinutes: 7,
    xp: 50,
    sections: [
      {
        title: 'The If Statement & Indentation',
        content: 'Python uses indentation (4 spaces) to define blocks of code that execute only when a condition evaluates to True.',
        codeExample: `player_hp = 12

if player_hp < 20:
    print("Warning: Drink a health potion!")
print("Battle continues...")`,
        outputExample: `Warning: Drink a health potion!
Battle continues...`,
        tip: 'Always remember the colon `:` at the end of the `if` line, and indent the body by 4 spaces.'
      },
      {
        title: 'Branching with Elif and Else',
        content: 'When an `if` is False, Python evaluates each `elif` (else if) sequentially. If none match, the optional `else` block runs.',
        codeExample: `rank = 85

if rank >= 90:
    tier = "Master"
elif rank >= 70:
    tier = "Diamond"
elif rank >= 50:
    tier = "Gold"
else:
    tier = "Bronze"

print("Assigned Tier:", tier)`,
        outputExample: `Assigned Tier: Diamond`,
      }
    ],
    quiz: {
      question: 'In an if-elif-else chain, when does the `else` block execute?',
      options: [
        'Always, regardless of conditions',
        'Only when the first if condition is True',
        'Only when none of the preceding if or elif conditions are True',
        'Before any elif condition is checked'
      ],
      correctIndex: 2,
      explanation: 'The `else` block acts as a fallback that executes only when all previous conditions evaluated to False.'
    }
  },

  // Chapter 3: The Crystal Caverns
  {
    id: 'lesson-3-1',
    chapterId: 'chap-3',
    title: 'Runes & Inscriptions: Slicing & Indexing',
    summary: 'Inspect individual characters and slice substrings using bracket index syntax [start:stop:step].',
    estimatedMinutes: 6,
    xp: 50,
    sections: [
      {
        title: 'Zero-Indexed Characters',
        content: 'Strings in Python are sequences of characters. The first character is index `0`. Negative indices count backward from the end (`-1` is the last character).',
        codeExample: `spell = "Fireball"

print(spell[0])   # 'F' (first character)
print(spell[1])   # 'i'
print(spell[-1])  # 'l' (last character)
print(len(spell)) # 8 (total characters)`,
        outputExample: `F
i
l
8`,
      },
      {
        title: 'String Slicing [start:stop:step]',
        content: 'Slice a portion of a string using `[start:stop]`. Note: the `stop` index is exclusive (not included!).',
        codeExample: `realm = "Avalonia"

print(realm[0:4])   # 'Aval' (indices 0, 1, 2, 3)
print(realm[4:])    # 'onia' (from 4 to the end)
print(realm[:3])    # 'Ava'  (from beginning up to 3)
print(realm[::-1])  # 'ainolavA' (reversed!)`,
        outputExample: `Aval
onia
Ava
ainolavA`,
        tip: 'Omitting start starts at index 0. Omitting stop goes all the way to the end.'
      }
    ],
    quiz: {
      question: 'Given `word = "Python"`, what does `word[1:4]` produce?',
      options: ['"Pyth"', '"yth"', '"ytho"', '"Pyt"'],
      correctIndex: 1,
      explanation: 'Index 1 is "y", index 2 is "t", index 3 is "h". Index 4 ("o") is excluded, giving "yth".'
    }
  },
  {
    id: 'lesson-3-2',
    chapterId: 'chap-3',
    title: 'The Art of Inscription: Methods & F-Strings',
    summary: 'Transform text with .upper(), .lower(), .replace(), .strip(), and interpolate variables with f-strings.',
    estimatedMinutes: 6,
    xp: 50,
    sections: [
      {
        title: 'Common String Methods',
        content: 'Strings possess built-in helper methods that return modified copies without altering the original string.',
        codeExample: `hero = "  Sir Lancelot  "

print(hero.strip())            # "Sir Lancelot" (removes outer spaces)
print(hero.upper())            # "  SIR LANCELOT  "
print(hero.lower())            # "  sir lancelot  "
print("apple pie".replace("apple", "cherry")) # "cherry pie"`,
        outputExample: `Sir Lancelot
  SIR LANCELOT  
  sir lancelot  
cherry pie`,
      },
      {
        title: 'Modern F-Strings (Formatted String Literals)',
        content: 'Prefix a string with `f` and embed variables or expressions directly inside curly braces `{}`.',
        codeExample: `hero = "Arthur"
level = 42
sword = "Excalibur"

message = f"Greetings, {hero}! At Level {level}, your weapon is {sword}."
print(message)`,
        outputExample: `Greetings, Arthur! At Level 42, your weapon is Excalibur.`,
        tip: 'You can even do math inside f-string braces: `f"Double level: {level * 2}"`.'
      }
    ],
    quiz: {
      question: 'How do you format a string to show the value of a variable `gold` using an f-string?',
      options: ['f"You have {gold} gold"', '"You have {gold} gold"', 'f"You have gold"', 'format("You have {gold}")'],
      correctIndex: 0,
      explanation: 'Prefix with f and wrap variable names inside curly braces `{gold}`.'
    }
  },

  // Chapter 4: The Clockwork Citadel
  {
    id: 'lesson-4-1',
    chapterId: 'chap-4',
    title: 'The Infinite Gear: For Loops & Range',
    summary: 'Iterate over sequences of numbers, characters, and lists automatically with for loops.',
    estimatedMinutes: 6,
    xp: 50,
    sections: [
      {
        title: 'The Range Function',
        content: 'The `range()` function generates an arithmetic progression of numbers.\n- `range(5)` : 0, 1, 2, 3, 4\n- `range(2, 6)` : 2, 3, 4, 5\n- `range(1, 10, 2)` : 1, 3, 5, 7, 9 (step by 2)',
        codeExample: `for step in range(3):
    print("Gear tick:", step)`,
        outputExample: `Gear tick: 0
Gear tick: 1
Gear tick: 2`,
      },
      {
        title: 'Iterating Characters and Lists',
        content: 'You can loop directly over any iterable collection like characters in a string or items in a list.',
        codeExample: `spells = ["Heal", "Shield", "Blaze"]

for spell in spells:
    print(f"Casting: {spell}!")`,
        outputExample: `Casting: Heal!
Casting: Shield!
Casting: Blaze!`,
      }
    ],
    quiz: {
      question: 'How many times will `for i in range(1, 5):` run its loop body?',
      options: ['5 times', '4 times', '6 times', '1 time'],
      correctIndex: 1,
      explanation: 'range(1, 5) produces numbers 1, 2, 3, 4 (stops before 5), running exactly 4 times.'
    }
  },
  {
    id: 'lesson-4-2',
    chapterId: 'chap-4',
    title: 'The Perpetual Engine: While Loops & Break',
    summary: 'Loop while a condition remains True, manage accumulator variables, and exit early with break.',
    estimatedMinutes: 6,
    xp: 50,
    sections: [
      {
        title: 'While Loops',
        content: 'A `while` loop continues executing as long as its test condition evaluates to `True`. Make sure to update your condition inside the loop to avoid infinite loops!',
        codeExample: `stamina = 3

while stamina > 0:
    print(f"Swinging sword! Stamina left: {stamina}")
    stamina -= 1

print("Exhausted! Must rest.")`,
        outputExample: `Swinging sword! Stamina left: 3
Swinging sword! Stamina left: 2
Swinging sword! Stamina left: 1
Exhausted! Must rest.`,
      },
      {
        title: 'Loop Control: break and continue',
        content: '- `break` : Immediately terminates and exits the entire loop.\n- `continue` : Skips the remainder of the current iteration and jumps to the next.',
        codeExample: `for num in range(1, 10):
    if num == 4:
        continue # Skip 4
    if num == 7:
        break    # Stop at 7
    print(num, end=" ")`,
        outputExample: `1 2 3 5 6 `,
      }
    ],
    quiz: {
      question: 'What does the `break` statement do inside a loop?',
      options: [
        'Skips only the current iteration',
        'Immediately terminates the loop and moves past it',
        'Restarts the loop from 0',
        'Causes a syntax error'
      ],
      correctIndex: 1,
      explanation: '`break` immediately exits the enclosing loop entirely.'
    }
  },

  // Chapter 5: The Inventory Forge
  {
    id: 'lesson-5-1',
    chapterId: 'chap-5',
    title: 'The Bag of Holding: Working with Lists',
    summary: 'Store ordered collections, append, remove, sort, and slice lists of data.',
    estimatedMinutes: 7,
    xp: 50,
    sections: [
      {
        title: 'Creating and Accessing Lists',
        content: 'Lists hold an ordered collection of elements surrounded by square brackets `[]`. Elements can be accessed by index and modified (mutable).',
        codeExample: `inventory = ["Sword", "Shield", "Torch"]

print(inventory[0])      # "Sword"
inventory[2] = "Lantern" # Replaced Torch with Lantern
print(inventory)`,
        outputExample: `Sword
['Sword', 'Shield', 'Lantern']`,
      },
      {
        title: 'List Methods: append, pop, and len',
        content: '- `.append(item)` adds an item to the end of the list.\n- `.pop()` removes and returns the last item.\n- `len(list)` returns the total count of elements.\n- `item in list` checks membership.',
        codeExample: `loot = ["Ruby", "Sapphire"]
loot.append("Emerald")

print("Count:", len(loot))
print("Has Ruby?", "Ruby" in loot)
removed = loot.pop()
print("Removed:", removed)`,
        outputExample: `Count: 3
Has Ruby? True
Removed: Emerald`,
      }
    ],
    quiz: {
      question: 'Which method adds a new element to the end of a list?',
      options: ['.add()', '.append()', '.push()', '.insert_last()'],
      correctIndex: 1,
      explanation: 'In Python, lists use the `.append()` method to add an element to the end.'
    }
  },
  {
    id: 'lesson-5-2',
    chapterId: 'chap-5',
    title: 'The Codex of Keys: Dictionaries',
    summary: 'Store data in key-value pairs {key: value} for lightning-fast lookup and organization.',
    estimatedMinutes: 7,
    xp: 50,
    sections: [
      {
        title: 'Key-Value Pairs',
        content: 'Dictionaries map unique keys to values using curly braces `{}`. Look up a value by its key in square brackets.',
        codeExample: `hero_stats = {
    "name": "Eldrin",
    "class": "Mage",
    "mana": 120,
    "hp": 85
}

print(hero_stats["name"])
print(hero_stats["mana"])`,
        outputExample: `Eldrin
120`,
      },
      {
        title: 'Adding, Updating, and the .get() Method',
        content: 'Assign to a key to add or update it. Use `.get(key, default)` to safely access a key without crashing if it does not exist.',
        codeExample: `bag = {"potions": 3}
bag["arrows"] = 25       # Added new key
bag["potions"] += 2      # Updated existing key

print("Gold count:", bag.get("gold", 0)) # Returns 0 instead of KeyError
print(bag)`,
        outputExample: `Gold count: 0
{'potions': 5, 'arrows': 25}`,
      }
    ],
    quiz: {
      question: 'What happens if you access `dict["missing_key"]` directly versus `dict.get("missing_key", 0)`?',
      options: [
        'Both return 0',
        'Direct access raises a KeyError, while .get() safely returns the default value (0)',
        'Direct access returns None, .get() raises an error',
        'Both return None'
      ],
      correctIndex: 1,
      explanation: 'Direct indexing raises a KeyError if the key is missing, while .get() returns the default value without throwing an error.'
    }
  },

  // Chapter 6: The Celestial Spire
  {
    id: 'lesson-6-1',
    chapterId: 'chap-6',
    title: 'Crafting Spells: Defining Functions',
    summary: 'Write reusable code blocks using def, parameters, default arguments, and return statements.',
    estimatedMinutes: 7,
    xp: 50,
    sections: [
      {
        title: 'The def Keyword & Parameters',
        content: 'Functions bundle code into named, reusable recipes. Use `def function_name(param1, param2):` to define a function.',
        codeExample: `def cast_fireball(target, power=50):
    print(f"Casting Fireball at {target} for {power} damage!")

cast_fireball("Goblin")
cast_fireball("Dragon", power=200)`,
        outputExample: `Casting Fireball at Goblin for 50 damage!
Casting Fireball at Dragon for 200 damage!`,
      },
      {
        title: 'The Return Statement',
        content: 'A function can return a value back to whoever called it using the `return` keyword. Once a function hits `return`, it exits immediately.',
        codeExample: `def calculate_crit(base_dmg, multiplier):
    crit_dmg = base_dmg * multiplier
    return crit_dmg

hit = calculate_crit(40, 2.5)
print("Critical Hit Damage:", hit)`,
        outputExample: `Critical Hit Damage: 100.0`,
        tip: 'If a function reaches the end without a return statement, it implicitly returns `None`.'
      }
    ],
    quiz: {
      question: 'What happens to the remaining code in a function after a `return` statement executes?',
      options: [
        'It executes on the next call',
        'It is skipped and the function exits immediately',
        'It runs in the background',
        'It raises a warning'
      ],
      correctIndex: 1,
      explanation: 'Executing a `return` statement immediately terminates the function and passes the value back to the caller.'
    }
  },
  {
    id: 'lesson-6-2',
    chapterId: 'chap-6',
    title: 'Algorithmic Alchemy: Problem Solving',
    summary: 'Combine functions, loops, and conditions to solve real algorithmic problems like searching and filtering.',
    estimatedMinutes: 8,
    xp: 50,
    sections: [
      {
        title: 'Decomposing Problems',
        content: 'Great programmers break complex challenges into small, testable steps:\n1. Understand Inputs and Outputs\n2. Work through a manual example by hand\n3. Write the pseudocode structure\n4. Translate into Python and test edge cases',
        codeExample: `# Example: Count how many numbers are greater than threshold
def count_high_scores(scores, threshold):
    count = 0
    for s in scores:
        if s > threshold:
            count += 1
    return count

print(count_high_scores([45, 92, 18, 88, 71], 70)) # 3`,
        outputExample: `3`,
      },
      {
        title: 'Edge Cases to Always Watch For',
        content: 'Always ask yourself:\n- What if the input list or string is empty (`[]`, `""`)?\n- What if the number is `0` or negative?\n- What if all values are equal?',
        codeExample: `def safe_average(numbers):
    if not numbers:
        return 0  # Handles empty list gracefully without dividing by zero!
    return sum(numbers) / len(numbers)

print(safe_average([10, 20, 30])) # 20.0
print(safe_average([]))           # 0`,
        outputExample: `20.0
0`,
      }
    ],
    quiz: {
      question: 'Why is it important to check `if not numbers:` before calculating an average `sum(numbers) / len(numbers)`?',
      options: [
        'To prevent a ZeroDivisionError when the list is empty',
        'To make the code run faster',
        'Because sum() cannot accept numbers',
        'Because len() returns a float'
      ],
      correctIndex: 0,
      explanation: 'If the list is empty, `len(numbers)` is 0. Dividing by 0 causes a fatal ZeroDivisionError in Python.'
    }
  }
];
