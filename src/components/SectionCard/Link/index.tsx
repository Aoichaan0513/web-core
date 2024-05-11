'use client';

import clsx from 'clsx';
import React, { useContext } from 'react';
import { ConfigContext } from '../../../utils';
import { SectionButtonCard, SectionButtonCardProps } from '../Button';
import { SectionCardDisplayIcon } from '../display';

export const sectionLinkCardClasses = {
    root: 'SectionLinkCard-root'
};

export type SectionLinkCardProps = Omit<SectionButtonCardProps<'a'>, 'component'>;

export const SectionLinkCard = (
    {
        children,
        disabled: _disabled,
        variant,
        className,
        sx,
        slots,
        slotProps,
        ...props
    }: SectionLinkCardProps
) => {
    const { components, icons: { OpenInNew } } = useContext(ConfigContext);
    const {
        disabled: configDisabled,
        variant: configVariant,
        slots: configSlots,
        slotProps: configSlotProps
    } = components?.SectionLinkCard ?? {};

    const disabled = _disabled ?? configDisabled;
    return (
        <SectionButtonCard
            component="a"
            disabled={disabled}
            variant={variant ?? configVariant}
            className={clsx(sectionLinkCardClasses.root, className)}
            sx={{ flexWrap: 'nowrap', ...sx }}
            slots={slots ?? configSlots}
            slotProps={slotProps ?? configSlotProps}
            {...props}
        >
            {children}
            <SectionCardDisplayIcon>
                <OpenInNew color={!disabled ? 'action' : 'disabled'} />
            </SectionCardDisplayIcon>
        </SectionButtonCard>
    );
};
