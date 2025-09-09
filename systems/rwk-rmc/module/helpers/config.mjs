const RMC = {};

RMC.Character = "Character";
((RMC.Equipment = "Equipment"),
  (RMC.Notes = "Notes"),
  (RMC.abilities = {
    str: "RMC.Ability.Str.long",
    dex: "RMC.Ability.Dex.long",
    con: "RMC.Ability.Con.long",
    int: "RMC.Ability.Int.long",
    wis: "RMC.Ability.Wis.long",
    cha: "RMC.Ability.Cha.long",
  }));
RMC.abilityAbbreviations = {
  str: "RMC.Ability.Str.abbr",
  dex: "RMC.Ability.Dex.abbr",
  con: "RMC.Ability.Con.abbr",
  int: "RMC.Ability.Int.abbr",
  wis: "RMC.Ability.Wis.abbr",
  cha: "RMC.Ability.Cha.abbr",
};

export default RMC;
