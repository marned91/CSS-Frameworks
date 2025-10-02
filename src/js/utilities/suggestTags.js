/**
 * A dictionary of common terms associated with specific tags, where each tag has a corresponding regular expression to match relevant terms in a post's title.
 * Used to suggest tags based on keywords found in the title.
 * @const {Object} tagDictionary
 */

const tagDictionary = {
  Education: /\b(school|education|learn(ing)?|study(ing)?|teach(ing)?)\b/i,
  Technology:
    /\b(computer|AI|software|programming|code(ing)?|tech(nology)?|hardware|internet|app(s)|robotics|cybersecurity)\b/i,
  Health:
    /\b(health|fitness|workout|exercise|diet|nutrition|yoga|self\s?care)\b/i,
  Travel: /\b(travel(ing)?|vacation|trip|journey|tour(ism)?|hiking)\b/i,
  Food: /\b(food|cook(ing)?|recipe|eat(ing)?|cuisine|meal)\b/i,
  Pets: /\b(pet(s)?|dog(s)?|cat(s)?|bird(s)?|hamster(s)?|reptile(s)?|rabbits(s)?|pupp(y|ies)|kitten(s)?|guinea\s?pig(s)?|fish|fluffy)\b/i,
  Hobbies:
    /\b(hobby|hobbies|craft(s)?|DIY|art(s)?|draw(ing)?|paint(ing)?|photograph(y|er)?|garden(ing)?|programming|cod(ing)?)\b/i,
};

export function suggestTags(title) {
  const suggestedTags = [];

  for (const [tag, regex] of Object.entries(tagDictionary)) {
    if (regex.test(title)) {
      suggestedTags.push(tag);
    }
  }
  return suggestedTags;
}
