import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function SectionHeading({
  title,
  children,
}: {
  title: string
  children?: ReactNode
}) {
  return (
    <div className="mb-4">
      <h2 className="section-title">{title}</h2>
      {children && (
        <p className="section-intro">
          {children}
        </p>
      )}
    </div>
  )
}

type EyebrowProps<T extends ElementType> = {
  as?: T
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children'>

export function Eyebrow<T extends ElementType = 'h3'>({
  as,
  className,
  children,
  ...props
}: EyebrowProps<T>) {
  const Component = as || 'h3'

  return (
    <Component
      className={cn(
        'eyebrow',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export function FeatureCard({
  title,
  label,
  children,
  tags,
  footer,
  titleClassName,
  className,
}: {
  title: string
  label: string
  children: ReactNode
  tags: string[]
  footer?: ReactNode
  titleClassName?: string
  className?: string
}) {
  return (
    <Card className={cn('feature-card', className)}>
      <div className="feature-card-accent" aria-hidden />
      <CardContent className="flex flex-1 flex-col p-0">
        <div className="space-y-2 p-5">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <p className={cn('feature-card-title', titleClassName)}>{title}</p>
            <Badge variant="secondary" className="shrink-0 text-[10px] font-medium">
              {label}
            </Badge>
          </div>
          <p className="feature-card-copy">
            {children}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-[10px] font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        {footer && (
          <div className="feature-card-footer">
            {footer}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function PickerOption({
  id,
  children,
  defaultChecked = true,
}: {
  id: string
  children: ReactNode
  defaultChecked?: boolean
}) {
  return (
    <label htmlFor={id} className="picker-option">
      <input
        id={id}
        type="checkbox"
        className="brand-checkbox mt-0.5"
        defaultChecked={defaultChecked}
      />
      <span className="picker-option-text">
        {children}
      </span>
    </label>
  )
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <p className="ton-callout">
      {children}
    </p>
  )
}
