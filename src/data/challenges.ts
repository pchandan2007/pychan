import { Challenge } from '../types';

export const CHALLENGES: Challenge[] = [
  // Chapter 1: The Whispering Glade (Fundamentals & Math)
  {
    id: 'ch-1-1',
    chapterId: 'chap-1',
    title: "The Alchemist's Cauldron",
    difficulty: 'Novice',
    xp: 75,
    story: "The Grand Herbalist needs help brewing an energetic potion. Combine the droplet counts of the moon-dew and sun-nectar to calculate the total potion volume.",
    instructions: "Write a function `brew_potion(moon_dew, sun_nectar)` that accepts two integers and returns their sum.",
    starterCode: `def brew_potion(moon_dew, sun_nectar):
    # Add moon_dew and sun_nectar together and return the result
    pass
`,
    solutionSnippet: `def brew_potion(moon_dew, sun_nectar):
    return moon_dew + sun_nectar
`,
    hints: [
      "Use the `+` operator to combine two numbers in Python.",
      "Remember to use the `return` keyword to output the answer from your function."
    ],
    entryFunctionName: 'brew_potion',
    testCases: [
      { id: 'tc-1-1-1', description: 'Small potion', input: '5, 12', expected: 17 },
      { id: 'tc-1-1-2', description: 'Zero sun nectar', input: '20, 0', expected: 20 },
      { id: 'tc-1-1-3', description: 'Large batch brew', input: '150, 350', expected: 500, hidden: true },
    ],
  },
  {
    id: 'ch-1-2',
    chapterId: 'chap-1',
    title: 'Splitting the Dungeon Loot',
    difficulty: 'Novice',
    xp: 80,
    story: "Your guild defeated a goblin den and retrieved a chest of gold coins. You must divide the coins equally among the party members, and deposit any leftover remainder into the guild treasury.",
    instructions: "Write a function `split_loot(total_gold, party_members)` that returns a list `[share_per_member, leftover]` using integer division `//` and modulus `%`.",
    starterCode: `def split_loot(total_gold, party_members):
    # Calculate each adventurer's equal share and the remaining gold
    pass
`,
    solutionSnippet: `def split_loot(total_gold, party_members):
    share = total_gold // party_members
    leftover = total_gold % party_members
    return [share, leftover]
`,
    hints: [
      "Use `//` for whole integer division (discarding decimals).",
      "Use `%` (modulo) to find the remainder after dividing.",
      "Return the values inside square brackets, like `[share, leftover]`."
    ],
    entryFunctionName: 'split_loot',
    testCases: [
      { id: 'tc-1-2-1', description: '10 gold among 3 adventurers', input: '10, 3', expected: [3, 1] },
      { id: 'tc-1-2-2', description: 'Even split with 0 remainder', input: '20, 4', expected: [5, 0] },
      { id: 'tc-1-2-3', description: 'Large hoard distribution', input: '107, 5', expected: [21, 2], hidden: true },
    ],
  },
  {
    id: 'ch-1-3',
    chapterId: 'chap-1',
    title: 'Frost Mage Temperature Converter',
    difficulty: 'Novice',
    xp: 85,
    story: "The Frost Mages measure freezing spells in Celsius, but the Imperial Scouts use Fahrenheit. Help them convert readings quickly.",
    instructions: "Write a function `celsius_to_fahrenheit(celsius)` that converts a Celsius temperature to Fahrenheit using the formula `(celsius * 9 / 5) + 32`.",
    starterCode: `def celsius_to_fahrenheit(celsius):
    # Convert celsius to fahrenheit and return it
    pass
`,
    solutionSnippet: `def celsius_to_fahrenheit(celsius):
    return (celsius * 9 / 5) + 32
`,
    hints: [
      "Parentheses ensure the multiplication and division happen before adding 32.",
      "0 degrees Celsius equals 32.0 degrees Fahrenheit."
    ],
    entryFunctionName: 'celsius_to_fahrenheit',
    testCases: [
      { id: 'tc-1-3-1', description: 'Freezing point of water', input: '0', expected: 32.0 },
      { id: 'tc-1-3-2', description: 'Boiling point of water', input: '100', expected: 212.0 },
      { id: 'tc-1-3-3', description: 'Room temperature', input: '20', expected: 68.0, hidden: true },
    ],
  },
  {
    id: 'ch-1-4',
    chapterId: 'chap-1',
    title: 'Dragon Hoard Appraiser',
    difficulty: 'Apprentice',
    xp: 95,
    story: "A merchant guild needs to appraise a dragon's hoard. Copper coins are worth 1 copper each, Silver coins are worth 10 copper, and Gold coins are worth 100 copper.",
    instructions: "Write a function `appraise_hoard(copper, silver, gold)` that calculates and returns the grand total value in copper coins.",
    starterCode: `def appraise_hoard(copper, silver, gold):
    # Return total value in copper
    pass
`,
    solutionSnippet: `def appraise_hoard(copper, silver, gold):
    return copper + (silver * 10) + (gold * 100)
`,
    hints: [
      "Multiply `silver * 10` and `gold * 100`.",
      "Sum all three coin values together."
    ],
    entryFunctionName: 'appraise_hoard',
    testCases: [
      { id: 'tc-1-4-1', description: 'Small pouch', input: '5, 2, 1', expected: 125 },
      { id: 'tc-1-4-2', description: 'Only gold coins', input: '0, 0, 10', expected: 1000 },
      { id: 'tc-1-4-3', description: 'Mixed dragon nest', input: '45, 12, 8', expected: 965, hidden: true },
    ],
  },

  // Chapter 2: The Crossroads of Logic (Conditionals & Booleans)
  {
    id: 'ch-2-1',
    chapterId: 'chap-2',
    title: 'The Citadel Gatekeeper',
    difficulty: 'Novice',
    xp: 85,
    story: "The Citadel guard only allows travelers through if they are at least Level 5 AND possess the Silver Key, OR if they are an Archmage of Level 20 or higher.",
    instructions: "Write a function `can_enter_citadel(level, has_key)` returning `True` if entry is allowed, otherwise `False`.",
    starterCode: `def can_enter_citadel(level, has_key):
    # Return True if traveler can enter, False otherwise
    pass
`,
    solutionSnippet: `def can_enter_citadel(level, has_key):
    if level >= 20:
        return True
    if level >= 5 and has_key:
        return True
    return False
`,
    hints: [
      "You can combine conditions with `and` / `or` or use an `if / else` statement.",
      "Check `(level >= 5 and has_key) or (level >= 20)`."
    ],
    entryFunctionName: 'can_enter_citadel',
    testCases: [
      { id: 'tc-2-1-1', description: 'Level 5 with key', input: '5, True', expected: true },
      { id: 'tc-2-1-2', description: 'Level 5 without key', input: '5, False', expected: false },
      { id: 'tc-2-1-3', description: 'Level 25 without key (Archmage)', input: '25, False', expected: true },
      { id: 'tc-2-1-4', description: 'Level 3 beginner', input: '3, True', expected: false, hidden: true },
    ],
  },
  {
    id: 'ch-2-2',
    chapterId: 'chap-2',
    title: 'The Potion Classifier',
    difficulty: 'Novice',
    xp: 90,
    story: "Potions in the apothecary have potency ratings. Dangerous liquids must be categorized immediately to prevent accidents.",
    instructions: "Write a function `classify_potion(potency)` that returns:\n- 'Poison' if potency is less than 0\n- 'Minor Draught' if potency is between 0 and 25 (inclusive)\n- 'Greater Potion' if potency is between 26 and 75 (inclusive)\n- 'Divine Elixir' if potency is greater than 75.",
    starterCode: `def classify_potion(potency):
    # Use if, elif, else to return the correct label string
    pass
`,
    solutionSnippet: `def classify_potion(potency):
    if potency < 0:
        return 'Poison'
    elif potency <= 25:
        return 'Minor Draught'
    elif potency <= 75:
        return 'Greater Potion'
    else:
        return 'Divine Elixir'
`,
    hints: [
      "Order your `if` and `elif` checks carefully starting from lowest to highest.",
      "Exact strings: 'Poison', 'Minor Draught', 'Greater Potion', 'Divine Elixir'."
    ],
    entryFunctionName: 'classify_potion',
    testCases: [
      { id: 'tc-2-2-1', description: 'Negative potency', input: '-5', expected: 'Poison' },
      { id: 'tc-2-2-2', description: 'Threshold 25', input: '25', expected: 'Minor Draught' },
      { id: 'tc-2-2-3', description: 'Mid potency', input: '50', expected: 'Greater Potion' },
      { id: 'tc-2-2-4', description: 'High potency elixir', input: '100', expected: 'Divine Elixir', hidden: true },
    ],
  },
  {
    id: 'ch-2-3',
    chapterId: 'chap-2',
    title: 'The Astrologer’s Leap Year',
    difficulty: 'Apprentice',
    xp: 100,
    story: "The Royal Astrologer needs an automated calendar verification to track solar alignments during leap years.",
    instructions: "Write a function `is_leap_year(year)` that returns `True` if `year` is a leap year, and `False` otherwise.\nA leap year is divisible by 4, EXCEPT centenary years (divisible by 100), which are only leap years if also divisible by 400.",
    starterCode: `def is_leap_year(year):
    # Return True if year is a leap year, otherwise False
    pass
`,
    solutionSnippet: `def is_leap_year(year):
    if year % 400 == 0:
        return True
    if year % 100 == 0:
        return False
    return year % 4 == 0
`,
    hints: [
      "Use modulo `%` to check if a number is divisible: `year % 4 == 0`.",
      "Check `year % 400 == 0` first, then `year % 100 == 0`, then `year % 4 == 0`."
    ],
    entryFunctionName: 'is_leap_year',
    testCases: [
      { id: 'tc-2-3-1', description: 'Standard leap year', input: '2024', expected: true },
      { id: 'tc-2-3-2', description: 'Standard non-leap year', input: '2023', expected: false },
      { id: 'tc-2-3-3', description: 'Century non-leap year 1900', input: '1900', expected: false },
      { id: 'tc-2-3-4', description: 'Century leap year 2000', input: '2000', expected: true, hidden: true },
    ],
  },
  {
    id: 'ch-2-4',
    chapterId: 'chap-2',
    title: 'Elemental Duel Arena',
    difficulty: 'Apprentice',
    xp: 105,
    story: "In the elemental duel arena, elemental affinity decides victory: 'fire' defeats 'earth', 'earth' defeats 'water', and 'water' defeats 'fire'.",
    instructions: "Write a function `elemental_duel(player, monster)` accepting two strings ('fire', 'water', or 'earth').\nReturn:\n- 'Victory' if player wins\n- 'Defeat' if monster wins\n- 'Draw' if both picked the same element.",
    starterCode: `def elemental_duel(player, monster):
    # Compare elements and return 'Victory', 'Defeat', or 'Draw'
    pass
`,
    solutionSnippet: `def elemental_duel(player, monster):
    if player == monster:
        return 'Draw'
    if (player == 'fire' and monster == 'earth') or \\
       (player == 'earth' and monster == 'water') or \\
       (player == 'water' and monster == 'fire'):
        return 'Victory'
    return 'Defeat'
`,
    hints: [
      "Check if `player == monster` first for an easy 'Draw'.",
      "Then check the three winning combinations for the player."
    ],
    entryFunctionName: 'elemental_duel',
    testCases: [
      { id: 'tc-2-4-1', description: 'Fire against Earth', input: "'fire', 'earth'", expected: 'Victory' },
      { id: 'tc-2-4-2', description: 'Water against Earth', input: "'water', 'earth'", expected: 'Defeat' },
      { id: 'tc-2-4-3', description: 'Identical elements', input: "'fire', 'fire'", expected: 'Draw' },
      { id: 'tc-2-4-4', description: 'Water extinguishing Fire', input: "'water', 'fire'", expected: 'Victory', hidden: true },
    ],
  },

  // Chapter 3: The Crystal Caverns (Strings & Slicing)
  {
    id: 'ch-3-1',
    chapterId: 'chap-3',
    title: 'Reversing the Ancient Scroll',
    difficulty: 'Novice',
    xp: 80,
    story: "An ancient crypt door is locked with mirrored script. The runes must be read backwards to disable the ward.",
    instructions: "Write a function `reverse_scroll(text)` that returns the reversed string using Python string slicing.",
    starterCode: `def reverse_scroll(text):
    # Return the reversed version of text
    pass
`,
    solutionSnippet: `def reverse_scroll(text):
    return text[::-1]
`,
    hints: [
      "In Python, step `-1` in slice syntax `[start:stop:step]` reads backwards: `text[::-1]`."
    ],
    entryFunctionName: 'reverse_scroll',
    testCases: [
      { id: 'tc-3-1-1', description: 'Simple word', input: "'pyquest'", expected: 'tseuqyp' },
      { id: 'tc-3-1-2', description: 'Spell incantation', input: "'abracadabra'", expected: 'arbadacarba' },
      { id: 'tc-3-1-3', description: 'Empty string test', input: "''", expected: '', hidden: true },
    ],
  },
  {
    id: 'ch-3-2',
    chapterId: 'chap-3',
    title: 'The Quest Herald Badge',
    difficulty: 'Novice',
    xp: 85,
    story: "When heroes accomplish brave feats, town criers proclaim it to the realm using a standardized announcement format.",
    instructions: "Write a function `herald_proclamation(hero, quest)` that returns a formatted announcement using an f-string in the exact format:\n`\"Hear ye! {hero} has conquered {quest}!\"`",
    starterCode: `def herald_proclamation(hero, quest):
    # Return formatted f-string proclamation
    pass
`,
    solutionSnippet: `def herald_proclamation(hero, quest):
    return f"Hear ye! {hero} has conquered {quest}!"
`,
    hints: [
      "Use an f-string like `f\"Hear ye! {hero} has conquered {quest}!\"`.",
      "Make sure punctuation (exclamation marks, spaces) matches exactly."
    ],
    entryFunctionName: 'herald_proclamation',
    testCases: [
      { id: 'tc-3-2-1', description: 'Basic announcement', input: "'Aria', 'The Goblin Cave'", expected: 'Hear ye! Aria has conquered The Goblin Cave!' },
      { id: 'tc-3-2-2', description: 'Dragon quest', input: "'Roland', 'Smaug the Red'", expected: 'Hear ye! Roland has conquered Smaug the Red!' },
    ],
  },
  {
    id: 'ch-3-3',
    chapterId: 'chap-3',
    title: 'Censoring the Shadow Curse',
    difficulty: 'Apprentice',
    xp: 95,
    story: "A grimoire contains forbidden shadow curses that corrupt whoever reads them. You must replace every occurrence of the cursed word with `***`.",
    instructions: "Write a function `cleanse_curse(manuscript, cursed_word)` that replaces all instances of `cursed_word` in `manuscript` with `'***'`. (Exact match)",
    starterCode: `def cleanse_curse(manuscript, cursed_word):
    # Replace cursed_word with '***'
    pass
`,
    solutionSnippet: `def cleanse_curse(manuscript, cursed_word):
    return manuscript.replace(cursed_word, '***')
`,
    hints: [
      "Python strings have a built-in `.replace(old, new)` method."
    ],
    entryFunctionName: 'cleanse_curse',
    testCases: [
      { id: 'tc-3-3-1', description: 'Single curse replacement', input: "'Beware of shadow beasts', 'shadow'", expected: 'Beware of *** beasts' },
      { id: 'tc-3-3-2', description: 'Repeated curse', input: "'dark magic and dark rituals', 'dark'", expected: '*** magic and *** rituals' },
      { id: 'tc-3-3-3', description: 'Curse not present', input: "'Peace in the realm', 'goblin'", expected: 'Peace in the realm', hidden: true },
    ],
  },
  {
    id: 'ch-3-4',
    chapterId: 'chap-3',
    title: 'The Palindrome Talisman',
    difficulty: 'Apprentice',
    xp: 105,
    story: "The door to the inner shrine only activates when given a word or phrase that reads identically forward and backwards, ignoring spaces and capitalization.",
    instructions: "Write a function `is_palindrome_rune(text)` that returns `True` if `text` is a palindrome after removing spaces and converting to lowercase, otherwise `False`.",
    starterCode: `def is_palindrome_rune(text):
    # Clean string (lowercase, remove spaces) and check if it equals its reverse
    pass
`,
    solutionSnippet: `def is_palindrome_rune(text):
    cleaned = text.replace(' ', '').lower()
    return cleaned == cleaned[::-1]
`,
    hints: [
      "Use `.lower()` to convert all letters to lowercase.",
      "Use `.replace(' ', '')` to strip out whitespace.",
      "Compare the cleaned text with `cleaned[::-1]`."
    ],
    entryFunctionName: 'is_palindrome_rune',
    testCases: [
      { id: 'tc-3-4-1', description: 'Classic palindrome', input: "'racecar'", expected: true },
      { id: 'tc-3-4-2', description: 'With spaces and capitals', input: "'Never odd or even'", expected: true },
      { id: 'tc-3-4-3', description: 'Non-palindrome word', input: "'python'", expected: false },
      { id: 'tc-3-4-4', description: 'Single character', input: "'A'", expected: true, hidden: true },
    ],
  },

  // Chapter 4: The Clockwork Citadel (Loops & Iteration)
  {
    id: 'ch-4-1',
    chapterId: 'chap-4',
    title: 'Sum of Even Cogwheels',
    difficulty: 'Novice',
    xp: 90,
    story: "The Grand Clockmaker needs to calculate the energy resonance from even-numbered cogwheels between 1 and `n` inclusive.",
    instructions: "Write a function `sum_even_cogs(n)` that calculates and returns the sum of all even integers from `1` up to and including `n`.",
    starterCode: `def sum_even_cogs(n):
    # Sum all even numbers between 1 and n
    pass
`,
    solutionSnippet: `def sum_even_cogs(n):
    total = 0
    for num in range(2, n + 1, 2):
        total += num
    return total
`,
    hints: [
      "You can loop through numbers using `for i in range(1, n + 1):` and check `if i % 2 == 0:`.",
      "Or use step 2 in range: `range(2, n + 1, 2)`."
    ],
    entryFunctionName: 'sum_even_cogs',
    testCases: [
      { id: 'tc-4-1-1', description: 'Up to 10', input: '10', expected: 30 }, // 2 + 4 + 6 + 8 + 10 = 30
      { id: 'tc-4-1-2', description: 'Small n', input: '4', expected: 6 }, // 2 + 4 = 6
      { id: 'tc-4-1-3', description: 'Odd boundary', input: '7', expected: 12 }, // 2 + 4 + 6 = 12
      { id: 'tc-4-1-4', description: 'Zero or one', input: '1', expected: 0, hidden: true },
    ],
  },
  {
    id: 'ch-4-2',
    chapterId: 'chap-4',
    title: 'The Mana Countdown',
    difficulty: 'Novice',
    xp: 85,
    story: "Before casting a time-dilation ritual, a chronomancer counts down seconds from `start` down to `0`.",
    instructions: "Write a function `mana_countdown(start)` that returns a list of integers counting backwards from `start` down to `0` inclusive.",
    starterCode: `def mana_countdown(start):
    # Return list [start, start-1, ..., 0]
    pass
`,
    solutionSnippet: `def mana_countdown(start):
    return list(range(start, -1, -1))
`,
    hints: [
      "You can use `range(start, -1, -1)` converted to a list.",
      "Or build a list with a `while` loop: append current value and decrement."
    ],
    entryFunctionName: 'mana_countdown',
    testCases: [
      { id: 'tc-4-2-1', description: 'Countdown from 5', input: '5', expected: [5, 4, 3, 2, 1, 0] },
      { id: 'tc-4-2-2', description: 'Countdown from 2', input: '2', expected: [2, 1, 0] },
      { id: 'tc-4-2-3', description: 'Countdown from 0', input: '0', expected: [0], hidden: true },
    ],
  },
  {
    id: 'ch-4-3',
    chapterId: 'chap-4',
    title: 'The FizzBuzz Rune Chant',
    difficulty: 'Apprentice',
    xp: 110,
    story: "Apprentice mages practice a sacred memory chant called FizzBuzz. Every multiple of 3 calls 'Fizz', every multiple of 5 calls 'Buzz', and multiples of both call 'FizzBuzz'!",
    instructions: "Write a function `fizz_buzz(n)` that returns a list of strings from 1 to `n`:\n- If divisible by 3 and 5: 'FizzBuzz'\n- If divisible by 3: 'Fizz'\n- If divisible by 5: 'Buzz'\n- Otherwise: string representation of the number (e.g. '1', '2')",
    starterCode: `def fizz_buzz(n):
    # Generate FizzBuzz sequence list for 1 to n
    pass
`,
    solutionSnippet: `def fizz_buzz(n):
    result = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            result.append("FizzBuzz")
        elif i % 3 == 0:
            result.append("Fizz")
        elif i % 5 == 0:
            result.append("Buzz")
        else:
            result.append(str(i))
    return result
`,
    hints: [
      "Check `i % 15 == 0` (or `i % 3 == 0 and i % 5 == 0`) FIRST before individual checks.",
      "Convert remaining numbers to strings with `str(i)` before appending."
    ],
    entryFunctionName: 'fizz_buzz',
    testCases: [
      { id: 'tc-4-3-1', description: 'First 5 elements', input: '5', expected: ['1', '2', 'Fizz', '4', 'Buzz'] },
      { id: 'tc-4-3-2', description: 'Up to 15 (includes FizzBuzz)', input: '15', expected: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz'] },
    ],
  },
  {
    id: 'ch-4-4',
    chapterId: 'chap-4',
    title: 'Vowel Frequency Analyzer',
    difficulty: 'Apprentice',
    xp: 100,
    story: "Musical spells gain their power from resonance vowels (a, e, i, o, u). Calculate the vowel intensity of an arcane incantation.",
    instructions: "Write a function `count_vowels(incantation)` that returns the total count of vowels (case-insensitive) in the given string.",
    starterCode: `def count_vowels(incantation):
    # Count vowels (a, e, i, o, u)
    pass
`,
    solutionSnippet: `def count_vowels(incantation):
    vowels = "aeiou"
    count = 0
    for char in incantation.lower():
        if char in vowels:
            count += 1
    return count
`,
    hints: [
      "Convert the string to lowercase first: `incantation.lower()`.",
      "Iterate through each character and check `if char in 'aeiou':`."
    ],
    entryFunctionName: 'count_vowels',
    testCases: [
      { id: 'tc-4-4-1', description: 'Basic word', input: "'hello'", expected: 2 },
      { id: 'tc-4-4-2', description: 'Arcane chant with mixed case', input: "'AbRaCaDaBrA'", expected: 5 },
      { id: 'tc-4-4-3', description: 'No vowels', input: "'rhythm'", expected: 0 },
      { id: 'tc-4-4-4', description: 'All vowels', input: "'SequOia'", expected: 5, hidden: true },
    ],
  },

  // Chapter 5: The Inventory Forge (Lists & Dictionaries)
  {
    id: 'ch-5-1',
    chapterId: 'chap-5',
    title: 'The Legendary Gem Search',
    difficulty: 'Novice',
    xp: 95,
    story: "The Dwarven smiths need to identify the highest power gem in a mining cart, but their scanning prism requires manual comparison logic.",
    instructions: "Write a function `find_max_gem(gem_powers)` that takes a non-empty list of integers and returns the highest value WITHOUT using Python's built-in `max()` function.",
    starterCode: `def find_max_gem(gem_powers):
    # Find and return the largest integer in gem_powers without using max()
    pass
`,
    solutionSnippet: `def find_max_gem(gem_powers):
    highest = gem_powers[0]
    for power in gem_powers:
        if power > highest:
            highest = power
    return highest
`,
    hints: [
      "Initialize `highest = gem_powers[0]`.",
      "Iterate through the list. If any number is greater than `highest`, update `highest`."
    ],
    entryFunctionName: 'find_max_gem',
    testCases: [
      { id: 'tc-5-1-1', description: 'Mixed positive powers', input: '[12, 45, 9, 88, 32]', expected: 88 },
      { id: 'tc-5-1-2', description: 'Single gem in cart', input: '[42]', expected: 42 },
      { id: 'tc-5-1-3', description: 'Negative values included', input: '[-10, -3, -50]', expected: -3, hidden: true },
    ],
  },
  {
    id: 'ch-5-2',
    chapterId: 'chap-5',
    title: 'Backpack Weight Filter',
    difficulty: 'Novice',
    xp: 90,
    story: "Your inventory is encumbered! Filter out any item that exceeds your pack's single-item weight allowance.",
    instructions: "Write a function `filter_loot(weights, max_limit)` that returns a new list containing only weights that are less than or equal to `max_limit`, preserving order.",
    starterCode: `def filter_loot(weights, max_limit):
    # Return items with weight <= max_limit
    pass
`,
    solutionSnippet: `def filter_loot(weights, max_limit):
    return [w for w in weights if w <= max_limit]
`,
    hints: [
      "You can create an empty list `allowed = []` and append valid items.",
      "Or use a list comprehension: `[w for w in weights if w <= max_limit]`."
    ],
    entryFunctionName: 'filter_loot',
    testCases: [
      { id: 'tc-5-2-1', description: 'Filter heavy rocks', input: '[5, 12, 3, 20, 8], 10', expected: [5, 3, 8] },
      { id: 'tc-5-2-2', description: 'All items allowed', input: '[1, 2, 3], 5', expected: [1, 2, 3] },
      { id: 'tc-5-2-3', description: 'No items under limit', input: '[50, 100], 25', expected: [], hidden: true },
    ],
  },
  {
    id: 'ch-5-3',
    chapterId: 'chap-5',
    title: 'Inventory Tally Counter',
    difficulty: 'Apprentice',
    xp: 105,
    story: "The quartermaster receives crates of raw supplies. Count the quantity of each distinct item to maintain accurate records.",
    instructions: "Write a function `tally_inventory(items)` that takes a list of string item names and returns a dictionary mapping each item name to its frequency count.",
    starterCode: `def tally_inventory(items):
    # Return dictionary {item_name: count}
    pass
`,
    solutionSnippet: `def tally_inventory(items):
    tally = {}
    for item in items:
        tally[item] = tally.get(item, 0) + 1
    return tally
`,
    hints: [
      "Initialize an empty dictionary `tally = {}`.",
      "For each item, if it's in tally increment its value, else set it to 1.",
      "The `.get(item, 0)` method is very handy here!"
    ],
    entryFunctionName: 'tally_inventory',
    testCases: [
      { id: 'tc-5-3-1', description: 'Several potions and arrows', input: "['potion', 'arrow', 'potion', 'potion', 'arrow']", expected: { 'potion': 3, 'arrow': 2 } },
      { id: 'tc-5-3-2', description: 'Single distinct items', input: "['sword', 'shield']", expected: { 'sword': 1, 'shield': 1 } },
      { id: 'tc-5-3-3', description: 'Empty backpack', input: '[]', expected: {}, hidden: true },
    ],
  },
  {
    id: 'ch-5-4',
    chapterId: 'chap-5',
    title: 'Merging Traveling Packs',
    difficulty: 'Apprentice',
    xp: 115,
    story: "Two traveling merchants decide to combine their wares into a joint trade ledger. If both have the same item, add their quantities together.",
    instructions: "Write a function `merge_ledgers(pack1, pack2)` that takes two dictionaries `{item: count}` and returns a merged dictionary with combined totals.",
    starterCode: `def merge_ledgers(pack1, pack2):
    # Combine two inventory dictionaries and sum shared quantities
    pass
`,
    solutionSnippet: `def merge_ledgers(pack1, pack2):
    result = dict(pack1)
    for item, count in pack2.items():
        result[item] = result.get(item, 0) + count
    return result
`,
    hints: [
      "Copy `pack1` into a new dictionary.",
      "Loop through `pack2.items()` and add `count` to the existing count in your result."
    ],
    entryFunctionName: 'merge_ledgers',
    testCases: [
      { id: 'tc-5-4-1', description: 'Overlap in apples and wood', input: "{'apple': 5, 'wood': 10}, {'apple': 3, 'iron': 2}", expected: { 'apple': 8, 'wood': 10, 'iron': 2 } },
      { id: 'tc-5-4-2', description: 'Completely disjoint items', input: "{'gold': 50}, {'silver': 100}", expected: { 'gold': 50, 'silver': 100 } },
    ],
  },

  // Chapter 6: The Celestial Spire (Functions & Algorithms)
  {
    id: 'ch-6-1',
    chapterId: 'chap-6',
    title: 'The Golden Spiral of Fibonacci',
    difficulty: 'Apprentice',
    xp: 110,
    story: "The Archmage's secret vault door unlocks using the Nth number in the sacred Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21...",
    instructions: "Write a function `fibonacci_number(n)` that returns the Nth Fibonacci number where `n >= 0`.\nNote: `fib(0) = 0`, `fib(1) = 1`, `fib(2) = 1`, `fib(3) = 2`, `fib(4) = 3`, etc.",
    starterCode: `def fibonacci_number(n):
    # Return the n-th Fibonacci number
    pass
`,
    solutionSnippet: `def fibonacci_number(n):
    if n == 0:
        return 0
    if n == 1:
        return 1
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b
`,
    hints: [
      "Handle base cases `n == 0` (returns 0) and `n == 1` (returns 1).",
      "An iterative loop tracking `a` and `b` is fast and avoids recursion limits!"
    ],
    entryFunctionName: 'fibonacci_number',
    testCases: [
      { id: 'tc-6-1-1', description: 'Base 0', input: '0', expected: 0 },
      { id: 'tc-6-1-2', description: 'Base 1', input: '1', expected: 1 },
      { id: 'tc-6-1-3', description: '6th Fibonacci', input: '6', expected: 8 },
      { id: 'tc-6-1-4', description: '10th Fibonacci', input: '10', expected: 55, hidden: true },
    ],
  },
  {
    id: 'ch-6-2',
    chapterId: 'chap-6',
    title: 'The Anagram Cypher Seal',
    difficulty: 'Apprentice',
    xp: 115,
    story: "Twin runes resonate only when their names are anagrams of each other (they contain the exact same characters in different order, ignoring spaces and capitalization).",
    instructions: "Write a function `is_anagram(word1, word2)` returning `True` if `word1` and `word2` are anagrams, otherwise `False`.",
    starterCode: `def is_anagram(word1, word2):
    # Return True if word1 and word2 are anagrams
    pass
`,
    solutionSnippet: `def is_anagram(word1, word2):
    w1 = sorted(word1.replace(' ', '').lower())
    w2 = sorted(word2.replace(' ', '').lower())
    return w1 == w2
`,
    hints: [
      "Clean each string by removing spaces and converting to `.lower()`.",
      "Sort the characters using `sorted(cleaned_string)` and compare equality."
    ],
    entryFunctionName: 'is_anagram',
    testCases: [
      { id: 'tc-6-2-1', description: 'Classic listen / silent', input: "'listen', 'silent'", expected: true },
      { id: 'tc-6-2-2', description: 'Dormitory / Dirty room', input: "'dormitory', 'dirty room'", expected: true },
      { id: 'tc-6-2-3', description: 'Different words', input: "'apple', 'banana'", expected: false },
      { id: 'tc-6-2-4', description: 'Same letters different count', input: "'aab', 'abb'", expected: false, hidden: true },
    ],
  },
  {
    id: 'ch-6-3',
    chapterId: 'chap-6',
    title: 'Deciphering the Caesar Scroll',
    difficulty: 'Adept',
    xp: 130,
    story: "A spy from the Dragon Citadel intercepted an encrypted directive. The letters have been shifted forward by a fixed key. Decrypt it by shifting each lowercase letter backwards.",
    instructions: "Write a function `caesar_decrypt(ciphertext, shift)` that shifts each lowercase letter `a-z` backward by `shift` places (wrapping around from `a` back to `z`). Keep spaces and other characters unchanged.",
    starterCode: `def caesar_decrypt(ciphertext, shift):
    # Decrypt lowercase letters by shifting backward by 'shift'
    pass
`,
    solutionSnippet: `def caesar_decrypt(ciphertext, shift):
    result = []
    for ch in ciphertext:
        if 'a' <= ch <= 'z':
            # 97 is ord('a')
            orig_idx = ord(ch) - ord('a')
            new_idx = (orig_idx - shift) % 26
            result.append(chr(ord('a') + new_idx))
        else:
            result.append(ch)
    return ''.join(result)
`,
    hints: [
      "Use `ord(ch)` to get character ASCII code and `chr(code)` to convert back.",
      "For a letter: `(ord(ch) - ord('a') - shift) % 26` gives new 0-25 index.",
      "Only shift lowercase characters; leave spaces and punctuation as is."
    ],
    entryFunctionName: 'caesar_decrypt',
    testCases: [
      { id: 'tc-6-3-1', description: 'Simple shift 1', input: "'bcd', 1", expected: 'abc' },
      { id: 'tc-6-3-2', description: 'Wrap around shift 3', input: "'cde abc', 3", expected: 'zab xyz' },
      { id: 'tc-6-3-3', description: 'Secret order', input: "'khoor zruog', 3", expected: 'hello world', hidden: true },
    ],
  },
  {
    id: 'ch-6-4',
    chapterId: 'chap-6',
    title: 'The Grand Boss Battle Simulator',
    difficulty: 'Adept',
    xp: 150,
    story: "Face the PyThon Wyrm at the summit of the Celestial Spire! Simulate a turn-based duel: the hero strikes first every round. If the boss's HP drops to 0 or below, the hero wins immediately without taking counter damage.",
    instructions: "Write a function `battle_boss(hero_hp, hero_atk, boss_hp, boss_atk)` returning:\n- `'Victory'` if hero defeats the boss\n- `'Defeat'` if boss defeats hero.\n\nRules each round:\n1. Hero deals `hero_atk` damage to boss.\n2. If `boss_hp <= 0`, return `'Victory'` immediately.\n3. Boss deals `boss_atk` damage to hero.\n4. If `hero_hp <= 0`, return `'Defeat'` immediately.",
    starterCode: `def battle_boss(hero_hp, hero_atk, boss_hp, boss_atk):
    # Simulate turn-based battle until one falls
    pass
`,
    solutionSnippet: `def battle_boss(hero_hp, hero_atk, boss_hp, boss_atk):
    while True:
        boss_hp -= hero_atk
        if boss_hp <= 0:
            return 'Victory'
        hero_hp -= boss_atk
        if hero_hp <= 0:
            return 'Defeat'
`,
    hints: [
      "Use a `while True:` loop.",
      "Hero strikes first: subtract `hero_atk` from `boss_hp`. Check if boss died.",
      "If boss survived, subtract `boss_atk` from `hero_hp`. Check if hero died."
    ],
    entryFunctionName: 'battle_boss',
    testCases: [
      { id: 'tc-6-4-1', description: 'Decisive hero victory', input: '100, 25, 50, 10', expected: 'Victory' },
      { id: 'tc-6-4-2', description: 'Boss overpowers hero', input: '30, 5, 100, 20', expected: 'Defeat' },
      { id: 'tc-6-4-3', description: 'Hero strikes lethal blow on last turn', input: '20, 20, 20, 50', expected: 'Victory' },
      { id: 'tc-6-4-4', description: 'Close endurance duel', input: '150, 15, 120, 20', expected: 'Victory', hidden: true },
    ],
  },
];
