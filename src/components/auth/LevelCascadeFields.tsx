"use client";

import { Fragment } from "react";
import {
  COLLEGE_FACULTIES,
  COLLEGE_OPTION,
  COLLEGE_STUDY_LEVELS,
  SCHOOL_LEVELS,
} from "@/lib/level";

export interface LevelCascadeFieldsProps {
  level: string;
  setLevel: (v: string) => void;
  collegeLevel: string;
  setCollegeLevel: (v: string) => void;
  faculty: string;
  setFaculty: (v: string) => void;
}

/** Standard/Form/College level cascade. Ported 1:1 from index.html. */
export function LevelCascadeFields({
  level,
  setLevel,
  collegeLevel,
  setCollegeLevel,
  faculty,
  setFaculty,
}: LevelCascadeFieldsProps) {
  const isCollege = level === COLLEGE_OPTION;
  return (
    <Fragment>
      <label className="field-label">Level</label>
      <select
        className="select-input"
        value={level}
        onChange={(e) => {
          const v = e.target.value;
          setLevel(v);
          if (v !== COLLEGE_OPTION) {
            setCollegeLevel("");
            setFaculty("");
          }
        }}
      >
        {SCHOOL_LEVELS.map((l) => (
          <option key={l}>{l}</option>
        ))}
        <option>{COLLEGE_OPTION}</option>
      </select>

      {isCollege && (
        <Fragment>
          <label className="field-label">Study level</label>
          <select
            className="select-input"
            value={collegeLevel}
            onChange={(e) => setCollegeLevel(e.target.value)}
          >
            <option value="">-- Select --</option>
            {COLLEGE_STUDY_LEVELS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Fragment>
      )}

      {isCollege && collegeLevel && (
        <Fragment>
          <label className="field-label">Faculty / Course</label>
          <select
            className="select-input"
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
          >
            <option value="">-- Select --</option>
            {COLLEGE_FACULTIES.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </Fragment>
      )}
    </Fragment>
  );
}

export default LevelCascadeFields;
