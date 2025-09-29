const ROLEMASTER = {};

ROLEMASTER.Character = "Character";
((ROLEMASTER.Equipment = "Equipment"),
  (ROLEMASTER.Notes = "Notes"),
  (ROLEMASTER.abilities = {
    str: "ROLEMASTER.Ability.Str.long",
    dex: "ROLEMASTER.Ability.Dex.long",
    con: "ROLEMASTER.Ability.Con.long",
    int: "ROLEMASTER.Ability.Int.long",
    wis: "ROLEMASTER.Ability.Wis.long",
    cha: "ROLEMASTER.Ability.Cha.long",
  }));
ROLEMASTER.abilityAbbreviations = {
  str: "ROLEMASTER.Ability.Str.abbr",
  dex: "ROLEMASTER.Ability.Dex.abbr",
  con: "ROLEMASTER.Ability.Con.abbr",
  int: "ROLEMASTER.Ability.Int.abbr",
  wis: "ROLEMASTER.Ability.Wis.abbr",
  cha: "ROLEMASTER.Ability.Cha.abbr",
};

export default ROLEMASTER;
