const { Raw } = require("eleventy-hast-jsx");
const Prose = require("./prose");
exports.data = {
  layout: "base.jsx",
};
exports.default = ({ content }) => (
  <Prose>
    <Raw html={content} />
  </Prose>
);
