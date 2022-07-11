import { Accidental, Clef, Note, note_letters } from ".";

export class Randomizer {
  constructor(
    public min_max_note_treble: MinMaxNote,
    public min_max_note_bass: MinMaxNote,
    public enabled_clefs: Clef[]
  ) {}
  get_random() {
    let enabled_clefs = this.enabled_clefs;
    if (enabled_clefs.length === 0) {
      enabled_clefs = [Clef.Treble, Clef.Bass];
    }

    let clef = random_element(enabled_clefs);

    let note_letter = random_element([...note_letters]);

    let min_max_note = new MinMaxNote(
      {
        note: "A",
        octave: 0
      } as Note,
      {
        note: "G",
        octave: 9
      } as Note
    );

    if (clef === Clef.Treble) {
      min_max_note = this.min_max_note_treble;
    }
    else if (clef === Clef.Bass) {
      min_max_note = this.min_max_note_bass;
    }
    let octave = random_int_from_interval(min_max_note.min.octave, min_max_note.max.octave);

    let accidental = Accidental.Default;
    if (note_letter.length > 1) {
      let accidentals = Object.values(Accidental).filter(a => a !== Accidental.Default);
      accidental = random_element(accidentals);
    }
    // end randomization

    if (accidental === Accidental.Sharp && note_letter === "GA") {
      octave++;
    }

    let index_of_current = note_letters.indexOf(note_letter);
    if (octave === min_max_note.min.octave) {
      let index_of_min_max = note_letters.indexOf(min_max_note.min.note);
      if (index_of_current < index_of_min_max) {
        octave++;
      }
    }
    else if (octave == min_max_note.max.octave) {
      let index_of_min_max = note_letters.indexOf(min_max_note.min.note);
      if (index_of_current < index_of_min_max) {
        octave--;
      }
    }
    let note = new Note(note_letter, octave);
    return { note, clef, accidental };
  }
}

function random_int_from_interval(min: number, max: number) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function random_element<T,>(array: T[]) {
  return array[Math.floor(Math.random()*array.length)];
}

export class MinMaxNote {
  constructor(
    public min: Note,
    public max: Note
  ){ }
}
