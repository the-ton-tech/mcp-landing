import { GettingStarted } from '@/components/GettingStarted'
import { McpSetup } from '@/components/McpSetup'
import { SkillsSetup } from '@/components/SkillsSetup'

function Divider() {
  return (
    <div
      className="my-10 mx-4 border-t sm:mx-8"
      style={{ borderColor: 'var(--separator-alpha)' }}
    />
  )
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
