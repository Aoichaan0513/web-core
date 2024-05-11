'use client';

import { Box, BoxProps, styled, Theme } from '@mui/material';
import { CreateSlotsAndSlotProps } from '@mui/material/utils/types';
import { BoxTypeMap } from '@mui/system';
import { OverridableComponent } from '@mui/types';
import clsx from 'clsx';
import deepmerge from 'deepmerge';
import React, { Dispatch, ElementType, ReactNode, SetStateAction, useContext, useState } from 'react';
import { Config, ConfigContext, ConfigProvider } from '../../../utils';
import {
    SectionButtonCard,
    sectionCardClasses,
    SectionCardDisabledProps,
    SectionCardDisplayRootProps,
    SectionCardDisplaySlotsAndSlotProps,
    SectionCardVariantProps
} from '../index';
import { SectionAccordionCardHeader, SectionAccordionCardHeaderIcon } from './header';
import { SectionAccordionCardItems } from './items';

export const sectionAccordionCardClasses = {
    root: 'SectionAccordionCard-root',
    header: 'SectionAccordionCard-header',
    headerIcon: 'SectionAccordionCard-headerIcon',
    items: 'SectionAccordionCard-items',

    expanded: 'SectionAccordionCard-expanded',
    readOnly: 'SectionAccordionCard-readOnly'
};

export const SectionAccordionCardRoot = styled(
    (
        {
            expanded,
            readOnly,
            variant,
            className,
            ...props
        }: BoxProps & Pick<SectionAccordionCardRootProps, 'expanded' | 'readOnly' | 'variant'>
    ) => (
        <Box
            className={
                clsx(
                    sectionAccordionCardClasses.root,
                    expanded && sectionAccordionCardClasses.expanded,
                    readOnly && sectionAccordionCardClasses.readOnly,
                    variant === 'outlined' ? sectionCardClasses.variantOutlined : sectionCardClasses.variantStandard,
                    className
                )
            }
            {...props}
        />
    ),
    { shouldForwardProp: (prop) => prop !== 'sx' }
)<BoxProps & Pick<SectionAccordionCardRootProps, 'expanded' | 'readOnly' | 'variant'>>(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.shape.borderRadius,
    [`&.${sectionCardClasses.variantOutlined}`]: {
        border: `solid 1px ${theme.palette.divider}`,
        [`& .${sectionCardClasses.root}`]: {
            border: 'none'
        }
    }
})) as OverridableComponent<BoxTypeMap<Pick<SectionAccordionCardRootProps, 'expanded' | 'readOnly' | 'variant'>, 'div', Theme>>;

export type SectionAccordionCardSlotsAndSlotProps = CreateSlotsAndSlotProps<{
    display?: SectionCardDisplaySlotsAndSlotProps['slots'];
}, {
    display: SectionCardDisplaySlotsAndSlotProps['slotProps'];
}>;

export interface SectionAccordionCardRootProps extends SectionCardDisplayRootProps, SectionCardDisabledProps, SectionCardVariantProps, SectionAccordionCardSlotsAndSlotProps {
    expanded?: boolean;
    setExpanded?: Dispatch<SetStateAction<boolean>>;
    defaultExpanded?: boolean;
    readOnly?: boolean;
    header?: ReactNode;
}

export type SectionAccordionCardProps<C extends ElementType = BoxTypeMap['defaultComponent']> =
    SectionAccordionCardRootProps
    & BoxProps<C, { component?: C }>;

export const SectionAccordionCard = <C extends ElementType = BoxTypeMap['defaultComponent'], >(
    {
        icon,
        primary,
        secondary,
        header,
        children,
        expanded: _expanded,
        setExpanded: _setExpanded,
        defaultExpanded,
        disabled: _disabled,
        readOnly: _readOnly,
        variant: _variant,
        slots,
        slotProps,
        ...props
    }: SectionAccordionCardProps<C>
) => {
    const config = useContext(ConfigContext);
    const {
        defaultExpanded: configDefaultExpanded,
        disabled: configDisabled,
        readOnly: configReadOnly,
        variant: configVariant,
        slots: configSlots,
        slotProps: configSlotProps
    } = config.components?.SectionAccordionCard ?? {};
    const ExpandMore = config.icons.ExpandMore;

    // tslint:disable-next-line:variable-name
    const [__expanded, __setExpanded] = useState(Boolean(defaultExpanded ?? configDefaultExpanded));
    const expanded = _expanded ?? __expanded;
    const setExpanded = _setExpanded ?? __setExpanded;

    const disabled = _disabled ?? configDisabled;
    const readOnly = _readOnly ?? configReadOnly;
    const variant = _variant ?? configVariant;
    return (
        <SectionAccordionCardRoot
            expanded={expanded}
            readOnly={readOnly}
            variant={variant}
            {...props}
        >
            <SectionAccordionCardHeader expanded={expanded} variant={variant}>
                {header ? header : <SectionButtonCard
                    onClick={() => setExpanded(!expanded)}
                    disabled={disabled}
                    icon={icon}
                    primary={primary}
                    secondary={secondary}
                    variant={variant}
                    slots={slots ?? configSlots}
                    slotProps={slotProps ?? configSlotProps}
                >
                    <SectionAccordionCardHeaderIcon expanded={expanded}>
                        <ExpandMore color={!disabled ? 'action' : 'disabled'} />
                    </SectionAccordionCardHeaderIcon>
                </SectionButtonCard>}
            </SectionAccordionCardHeader>
            <SectionAccordionCardItems in={expanded} readOnly={readOnly} variant={variant}>
                <ConfigProvider
                    value={
                        deepmerge<Config>(
                            config,
                            {
                                components: {
                                    SectionCard: {
                                        disabled: readOnly,
                                        variant
                                    }
                                }
                            }
                        )
                    }
                >
                    {children}
                </ConfigProvider>
            </SectionAccordionCardItems>
        </SectionAccordionCardRoot>
    );
};

export type SectionAccordionCardConfigProps = Partial<Omit<SectionAccordionCardRootProps, keyof SectionCardDisplayRootProps | 'expanded' | 'setExpanded' | 'header'>>;

export * from './header';
export * from './items';
