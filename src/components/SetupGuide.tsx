import { GettingStarted } from '@/components/GettingStarted'
import { McpSetup } from '@/components/McpSetup'
import { SkillsSetup } from '@/components/SkillsSetup'

function Divider() {
  return <div className="my-10 border-t border-border mx-4 sm:mx-8" />
}

export function SetupGuide() {
  return (
    <>
      <GettingStarted />
      <Divider />
      <SkillsSetup />
      <Divider />
      <McpSetup />
    </>
  )
}
