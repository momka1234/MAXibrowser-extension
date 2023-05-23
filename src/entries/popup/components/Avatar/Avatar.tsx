import * as React from 'react';

import { AccentColorProvider, Box, Text } from '~/design-system';
import { TextStyles } from '~/design-system/styles/core.css';

import ExternalImage from '../ExternalImage/ExternalImage';

function Avatar({
  imageUrl,
  size,
  mask,
}: {
  imageUrl?: string;
  size: number;
  mask?: string;
}) {
  return (
    <AvatarWrapper size={size}>
      {imageUrl && <AvatarImage mask={mask} size={size} imageUrl={imageUrl} />}
      <AvatarSkeleton />
    </AvatarWrapper>
  );
}

function AvatarWrapper({
  children,
  size,
  color,
}: {
  children: React.ReactNode;
  size: number;
  color?: string;
}) {
  return (
    <AccentColorProvider color={color || 'black'}>
      <Box
        borderRadius="round"
        boxShadow="18px accent"
        position="relative"
        style={{
          height: size,
          width: size,
          overflow: 'hidden',
        }}
      >
        {children}
      </Box>
    </AccentColorProvider>
  );
}

function AvatarContent({
  backgroundColor,
  children,
  mask,
}: {
  backgroundColor?: string;
  children: React.ReactNode;
  mask?: string;
}) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="full"
      top="0"
      left="0"
      right="0"
      bottom="0"
      style={{
        backgroundColor,
        zIndex: 1,
        ...(mask
          ? {
              maskImage: `url(${mask})`,
              WebkitMaskImage: `url(${mask})`,
            }
          : {}),
      }}
    >
      {children}
    </Box>
  );
}

function AvatarImage({
  imageUrl,
  size = 60,
  mask,
}: {
  imageUrl?: string;
  size: number;
  mask?: string;
}) {
  return (
    <AvatarContent>
      <ExternalImage
        mask={mask}
        src={imageUrl}
        width={size}
        height={size}
        loading="lazy"
      />
    </AvatarContent>
  );
}

function AvatarEmoji({
  color,
  emoji,
  size,
  mask,
}: {
  color?: string;
  emoji?: string;
  size?: TextStyles['fontSize'];
  mask?: string;
}) {
  return (
    <AvatarContent mask={mask} backgroundColor={color}>
      <Text size={size ?? '32pt'} weight="bold">
        {emoji}
      </Text>
    </AvatarContent>
  );
}

function AvatarSkeleton() {
  return (
    <Box
      background="surfaceSecondaryElevated"
      top="0"
      left="0"
      right="0"
      style={{
        zIndex: 0,
      }}
    />
  );
}

Avatar.Emoji = AvatarEmoji;
Avatar.Image = AvatarImage;
Avatar.Skeleton = AvatarSkeleton;
Avatar.Wrapper = AvatarWrapper;

export { Avatar };
