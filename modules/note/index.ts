export const note_letters = [ "A", "AB", "B", "C", "CD", "D", "DE", "E", "F", "FG", "G", "GA" ] as const;

export type NoteLetter =  typeof note_letters[number];

export function note_letter_to_easyscore(note_letter: NoteLetter, accidental: Accidental): string {
  if (note_letter.length > 1) {
    switch (accidental) {
      case Accidental.Flat:
        return note_letter[1] + Accidental.Flat;
        break;
      case Accidental.Sharp:
        return note_letter[1] + Accidental.Sharp;
        break;
    }
  }
  return note_letter;
}

export enum Accidental {
  Sharp = "#",
  Flat = "b",
  Default = ""
}

export enum Clef {
  Treble = "treble",
  Bass = "bass"
}

export class Note {
  note: NoteLetter
  octave: number
  constructor(note: NoteLetter, octave: number) {
    this.note = note;
    this.octave = octave;
  }
  to_easyscore(acccidental: Accidental) {
    return note_letter_to_easyscore(this.note, acccidental) + this.octave;
  }
}
