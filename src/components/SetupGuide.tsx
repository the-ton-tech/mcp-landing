import { GettingStarted } from '@/components/GettingStarted'
import { McpSetup } from '@/components/McpSetup'
import { SkillsSetup } from '@/components/SkillsSetup'
import { SectionDivider } from '@/components/ui/ton'

export function SetupGuide() {
  return (
    <>
      <GettingStarted />
      <SectionDivider />
      <SkillsSetup />
      <SectionDivider />
      <McpSetup />
    </>
  )
}
