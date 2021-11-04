import { writable } from 'svelte/store';
// in app storage
export const page = writable(0);
export const category = writable(0);
export const cat = writable("total");
export const isCategorySearching = writable(false);
export const dialogActive = writable(false);
export const categoryDropdownActive = writable(false);
export const themeDropdownActive = writable(false);
export const pageSearchActive = writable(false);
export const highlight = writable("var(--accent)");
export const searchActive = writable(false);
export const isOnUserPage = writable(false);

// persistent storage
export const name = writable("postpercent");
export const theme = writable("system");

// lists
export const themes = [
  "system",
  "dark",
  "light",
  "jeffalo"
]

export const categories = [
    ["0", "total"],
    ["1", "Suggestions"],
    // ["2", "Dustbin"],
    ["3", "Bugs and Glitches"],
    ["4", "Questions about Scratch"],
    ["5", "Announcements"],
    ["6", "New Scratchers"],
    ["7", "Help with Scripts"],
    ["8", "Show and Tell"],
    ["9", "Project Ideas"],
    ["10", "Collaboration"],
    ["11", "Requests"],
    // ["12", "Moderators"],
    ["13", "Deutsch"],
    ["14", "Español"],
    ["15", "Français"],
    ["16", "中文"],
    ["17", "Polski"],
    ["18", "日本語"],
    ["19", "Nederlands"],
    ["20", "Português"],
    ["21", "Italiano"],
    ["22", "עברית"],
    ["23", "한국어"],
    ["24", "Norsk"],
    ["25", "Türkçe"],
    ["26", "Ελληνικά"],
    ["27", "Pусский"],
    ["28", "Translating Scratch"],
    ["29", "Things I'm Making and Creating"],
    ["30", "Things I'm Reading and Playing"],
    ["31", "Advanced Topics"],
    ["32", "Connecting to the Physical World"],
    ["33", "Català"],
    ["34", "Other Languages"],
    // ["35", "Mentors Forum"],
    ["36", "Bahasa Indonesia"],
    // ["37", "Scratch Day 2014"],
    // ["38", "Spam Dustbin"],
    // ["39", "Scratch Helper Groups"],
    // ["40", "Camp Counselor Forum"],
    // ["41", "Extension Developer's Forum "],
    // ["42", "Scratch Stability Team Forum"],
    // ["44", "Scratch Day 2015"],
    // ["46", "Scratch Design Studio Forum "],
    ["48", "Developing Scratch Extensions"],
    ["49", "Open Source Projects"],
    // ["50", "Welcoming Committee"],
    // ["51", "Community Blocks Forum"],
    // ["52", "Scratch Day 2016"],
    // ["53", "[unknown (for now)]"],
    // ["54", "Scratch Day 2017"],
    // ["56", "[unknown (for now)]"],
    // ["57", "Scratch 3.0 Beta"],
    // ["58", "Camp Counselors 2020"],
    ["59", "فارسی"],
  ];