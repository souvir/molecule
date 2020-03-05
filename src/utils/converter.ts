enum list {
  "H" = "Hydrogen",
  "He" = "Helium",
  "Li" = "Lithium",
  "Be" = "Beryllium",
  "B" = "Boron",
  "C" = "Carbon",
  "N" = "Nitrogen",
  "O" = "Oxygen",
  "F" = "Fluorine",
  "Ne" = "Neon",
  "Na" = "Sodium",
  "Mg" = "Magnesium",
  "Al" = "Aluminum",
  "Si" = "Silicon",
  "P" = "Phosphorous",
  "S" = "Sulfur",
  "Cl" = "Chlorine",
  "Ar" = "Argon",
  "K" = "Potassium",
  "Ca" = "Calcium",
  "Sc" = "Scandium",
  "Ti" = "Titanium",
  "V" = "Vanadium",
  "Cr" = "Chromium",
  "Mn" = "Manganese",
  "Fe" = "Iron",
  "Co" = "Cobalt",
  "Ni" = "Nickel",
  "Cu" = "Copper",
  "Zn" = "Zinc",
  "Ga" = "Gallium",
  "Ge" = "Germanium",
  "As" = "Arsenic",
  "Se" = "Selenium",
  "Br" = "Bromine",
  "Kr" = "Krypton",
  "Rb" = "Rubidium",
  "Sr" = "Strontium",
  "Y" = "Yttrium",
  "Zr" = "Zirconium",
  "Nb" = "Niobium",
  "Mo" = "Molybdenum",
  "Tc" = "Technetium",
  "Ru" = "Ruthenium",
  "Rh" = "Rhodium",
  "Pd" = "Palladium",
  "Ag" = "Silver",
  "Cd" = "Cadmium",
  "In" = "Indium",
  "Sn" = "Tin",
  "Sb" = "Antimony",
  "Te" = "Tellurium",
  "I" = "Iodine",
  "Xe" = "Xenon",
  "Cs" = "Cesium",
  "Ba" = "Barium",
  "La" = "Lanthanum",
  "Ce" = "Cerium",
  "Pr" = "Praseodymium",
  "Nd" = "Neodymium",
  "Pm" = "Promethium",
  "Sm" = "Samarium",
  "Eu" = "Europium",
  "Gd" = "Gadolinium",
  "Tb" = "Terbium",
  "Dy" = "Dysprosium",
  "Ho" = "Holmium",
  "Er" = "Erbium",
  "Tm" = "Thulium",
  "Yb" = "Ytterbium",
  "Lu" = "Lutetium",
  "Hf" = "Hafnium",
  "Ta" = "Tantalum",
  "W" = "Tungsten",
  "Re" = "Rhenium",
  "Os" = "Osmium",
  "Ir" = "Iridium",
  "Pt" = "Platinum",
  "Au" = "Gold",
  "Hg" = "Mercury",
  "Tl" = "Thallium",
  "Pb" = "Lead",
  "Bi" = "Bismuth",
  "Po" = "Polonium",
  "At" = "Astatine",
  "Rn" = "Radon",
  "Fr" = "Francium",
  "Ra" = "Radium",
  "Ac" = "Actinium",
  "Th" = "Thorium",
  "Pa" = "Proactinium",
  "U" = "Uranium",
  "Np" = "Neptunium",
  "Pu" = "Plutonium",
  "Am" = "Americium",
  "Cm" = "Curium",
  "Bk" = "Berkelium",
  "Cf" = "Californium",
  "Es" = "Einsteinium",
  "Fm" = "Fermium",
  "Md" = "Mendelevium",
  "No" = "Nobelium",
  "Lr" = "Lawrencium",
  "Unq" = "Unnilquadium",
  "Unp" = "Unnilpentium",
  "Unh" = "Unnilhexium",
  "Uns" = "Unnilseptium"
};

const getAtomName = (code: keyof typeof list) => {
  return list[code] || "Unknown Atom";
};

const converter = (str: string) => {
    // ex: K4[ON(SO3)2]2
    str = str.replace("[", "(");
    str = str.replace("]", ")");
    // K4(ON(SO3)2)2
    while (/([A-Z][a-z]?)(\d+)/.test(str) || /\(([A-Za-z]+)\)(\d+)/.test(str)) {
      // K4(ON(SO3)2)2 -> KKKK(ON(SO3)2)2 -> KKKK(ON(SOOO)2)2 -> KKKK(ONSOOOSOOO)2 -> KKKKONSOOOSOOOONSOOOSOOO
      // @ts-ignore
      str = RegExp.leftContext + RegExp.$1.repeat(RegExp.$2) + RegExp.rightContext;
      // ... -> KKKK(ON(S + O*3 + )2)2 -> KKKK(ON + SOOO*2 + )2 -> ...
    }
    let map = new Map();
    // @ts-ignore
    str.match(/[A-Z][a-z]?/g)?.forEach(function(code) {
        // Loop -> K K K K O N S O O O S O O O O N S O O O S O O O
        const name = getAtomName(code as keyof typeof list)
        if (!map.has(name)) map.set(name, 1); // K -> Potassium 1
        else map.set(name, map.get(name) + 1); // K again -> Potassium 2, 3, 4
    });

    let res = "";
    map && map.forEach(function(value, key) {
        // Loop {Potassium: 4, Oxygen: 14, Nitrogen: 2, Sulfur: 4}
        res += key + ": " + value + "\n";
    });
    return res;
}

export default converter;
