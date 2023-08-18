import styled from '@emotion/styled';
import { em, rem, size } from 'polished';
import { RichEmbedContainer, richEmbedContainerClasses } from '../../components';

const Emoji = styled('img')<{ big?: boolean }>(({ theme, big }) => ({
    ...size(em(22)),
    objectFit: 'contain',
    verticalAlign: 'bottom',
    ...(theme.appearance.display === 'cozy' && big && {
        ...size(rem(48)),
        minHeight: rem(48)
    }),
    [`${RichEmbedContainer} &, .${richEmbedContainerClasses.root} &`]: {
        ...size(18)
    }
}));

Emoji.defaultProps = {
    draggable: false
};

export { Emoji };
