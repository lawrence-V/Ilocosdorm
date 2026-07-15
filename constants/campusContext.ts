const CAMPUS_CONTEXT: Record<string, string> = {
  "Laoag City": "Near Laoag campuses",
  "Vigan City": "Near the Vigan university belt",
  "San Nicolas": "Easy ride to Laoag campuses",
  "Batac City": "Near Batac campuses",
  "Candon City": "Near Candon campuses",
};

export function getCampusContext(city: string) {
  return CAMPUS_CONTEXT[city] ?? `Near schools in ${city}`;
}
