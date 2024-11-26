// src/components/Separator/Separator.js

import React from "react";
import PropTypes from "prop-types";
import { SeparatorFull, SeparatorPartial } from "./Separator.styles";

export const Separator = ({ type }) => {
  return type === "full" ? <SeparatorFull /> : <SeparatorPartial />;
};

Separator.propTypes = {
  type: PropTypes.oneOf(["full", "partial"]),
};
