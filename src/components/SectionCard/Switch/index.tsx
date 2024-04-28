'use client';

import { Switch, switchClasses } from '@mui/material';
import { CreateSlotsAndSlotProps, SlotProps } from '@mui/material/utils/types';
import clsx from 'clsx';
import React, { Dispatch, ElementType, SetStateAction } from 'react';
import { SectionButtonCard, SectionButtonCardProps } from '../Button';

export const sectionSwitchCardClasses = {
    root: 'SectionSwitchCard-root',
    control: 'SectionSwitchCard-control'
};

export interface SectionSwitchCardRootProps {
    checked: boolean;
    setChecked: Dispatch<SetStateAction<boolean>>;
    defaultChecked?: boolean;
}

export type SectionSwitchCardSlotsAndSlotProps = CreateSlotsAndSlotProps<{
    control?: ElementType;
}, {
    control: SlotProps<typeof Switch, {}, {}>;
}>;

export type SectionSwitchCardProps =
    SectionButtonCardProps
    & SectionSwitchCardRootProps
    & SectionSwitchCardSlotsAndSlotProps;

export const SectionSwitchCard = (
    {
        children,
        checked,
        setChecked,
        defaultChecked,
        disabled,
        className,
        sx,
        slots,
        slotProps,
        ...props
    }: SectionSwitchCardProps
) => (
    <SectionButtonCard
        onClick={() => setChecked(!checked)}
        disabled={disabled}
        className={clsx(sectionSwitchCardClasses.root, className)}
        sx={{ flexWrap: 'nowrap', ...sx }}
        slots={slots}
        slotProps={slotProps}
        {...props}
    >
        {children}
        <Switch
            component={slots?.control}
            checked={checked}
            onChange={() => setChecked(!checked)}
            defaultChecked={defaultChecked}
            disabled={disabled}
            disableRipple
            tabIndex={-1}
            className={sectionSwitchCardClasses.control}
            sx={{ [`& .${switchClasses.switchBase}`]: { backgroundColor: 'transparent !important' } }}
            {...slotProps?.control}
        />
    </SectionButtonCard>
);
