import { StringInputProps, set, unset } from 'sanity'
import { Stack, Text } from '@sanity/ui'
import { useCallback } from 'react'

export function LimitedStringInput(props: StringInputProps & { maxLength: number }) {
    const { value = '', onChange, maxLength } = props

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = event.currentTarget.value
            // Cortar el texto si excede el límite
            const limitedValue = newValue.slice(0, maxLength)
            onChange(limitedValue ? set(limitedValue) : unset())
        },
        [onChange, maxLength]
    )

    const remaining = maxLength - (value?.length || 0)
    const isNearLimit = remaining <= 10
    const isAtLimit = remaining === 0

    return (
        <Stack space={2}>
            <input
                type="text"
                value={value || ''}
                onChange={handleChange}
                maxLength={maxLength}
                style={{
                    width: '100%',
                    padding: '8px 12px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontFamily: 'inherit',
                }}
            />
            <Text
                size={1}
                style={{
                    color: isAtLimit ? '#f03e2f' : isNearLimit ? '#f59e0b' : '#6b7280',
                    textAlign: 'right',
                }}
            >
                {remaining} caracteres restantes
            </Text>
        </Stack>
    )
}
