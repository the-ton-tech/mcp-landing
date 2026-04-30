export const SKILLS_PATH = 'ton-org/skills'
export const SKILLS_INSTALL_CMD = `npx skills add ${SKILLS_PATH} -y`
export const skillsAddCmd = (...segments: string[]) =>
  `npx skills add ${segments.map(s => `${SKILLS_PATH}/${s}`).join(' ')} -y`
