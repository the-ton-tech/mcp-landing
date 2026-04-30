import { GettingStarted } from '@/components/GettingStarted'
import { McpSetup } from '@/components/McpSetup'
import { SkillsSetup } from '@/components/SkillsSetup'
import { WhatItIs } from '@/components/WhatItIs'

export function SetupGuide() {
  return (
    <div className="guide-stack">
      <WhatItIs />
      <GettingStarted />
      <SkillsSetup />
      <McpSetup />
    </div>
  )
}
