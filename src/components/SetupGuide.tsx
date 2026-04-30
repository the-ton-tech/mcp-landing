import { GettingStarted } from '@/components/GettingStarted'
import { McpSetup } from '@/components/McpSetup'
import { SkillsSetup } from '@/components/SkillsSetup'
import { SectionDivider } from '@/components/ui/ton'
import { WhatItIs } from '@/components/WhatItIs'

export function SetupGuide() {
  return (
    <>
      <WhatItIs />
      <SectionDivider />
      <GettingStarted />
      <SectionDivider />
      <SkillsSetup />
      <SectionDivider />
      <McpSetup />
    </>
  )
}
