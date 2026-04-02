import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { colors, radius, spacing } from '../theme';

// Pulsing live dot
export function LiveDot({ size = 5 }) {
  const anim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.timing(anim, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      Animated.timing(anim, { toValue: 1, duration: 700, useNativeDriver: true }),
    ])).start();
  }, []);
  return <Animated.View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: colors.pink, opacity: anim }} />;
}

// Live badge
export function LiveBadge() {
  return (
    <View style={styles.liveBadge}>
      <LiveDot />
      <Text style={styles.liveTxt}>LIVE</Text>
    </View>
  );
}

// Expiry badge
export function ExpiryBadge({ label }) {
  return (
    <View style={styles.expBadge}>
      <Text style={styles.expTxt}>⏱ {label} left</Text>
    </View>
  );
}

// Avatar
export function Avatar({ initials, color = 'pink', size = 36 }) {
  const bg = {
    pink: { bg: colors.pinkLight, border: colors.pinkBorder, text: colors.pink },
    teal: { bg: colors.tealLight, border: colors.tealBorder, text: colors.teal },
    amber: { bg: colors.amberLight, border: colors.amberBorder, text: colors.amber },
    blue: { bg: colors.blueLight, border: colors.blueBorder, text: colors.blue },
  }[color] || { bg: colors.pinkLight, border: colors.pinkBorder, text: colors.pink };

  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, backgroundColor: bg.bg, borderColor: bg.border }]}>
      <Text style={[styles.avatarTxt, { color: bg.text, fontSize: size * 0.33 }]}>{initials}</Text>
    </View>
  );
}

// Tag pill
export function Tag({ label, variant = 'dark' }) {
  const variants = {
    pink: { bg: colors.pinkLight, text: colors.pink },
    teal: { bg: colors.tealLight, text: colors.teal },
    amber: { bg: colors.amberLight, text: colors.amber },
    blue: { bg: colors.blueLight, text: colors.blue },
    dark: { bg: colors.dark4, text: colors.pale },
  };
  const v = variants[variant] || variants.dark;
  return (
    <View style={[styles.tag, { backgroundColor: v.bg }]}>
      <Text style={[styles.tagTxt, { color: v.text }]}>{label}</Text>
    </View>
  );
}

// Join button
export function JoinButton({ onPress, joined, variant = 'pink', label, style }) {
  const bg = joined ? colors.dark4 : variant === 'teal' ? colors.teal : colors.pink;
  const txt = joined ? (label || 'Joined ✓') : (label || 'Join');
  const txtColor = joined ? colors.soft : colors.white;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.joinBtn, { backgroundColor: bg }, style]} activeOpacity={0.8}>
      <Text style={[styles.joinTxt, { color: txtColor }]}>{txt}</Text>
    </TouchableOpacity>
  );
}

// Section header
export function SectionHeader({ title, action, onAction }) {
  return (
    <View style={styles.secHeader}>
      <Text style={styles.secTitle}>{title}</Text>
      {action && <TouchableOpacity onPress={onAction}><Text style={styles.secAction}>{action}</Text></TouchableOpacity>}
    </View>
  );
}

// Filter pill row item
export function FilterPill({ label, active, onPress, color = 'pink' }) {
  const activeColor = color === 'teal' ? colors.teal : colors.pink;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.filterPill, active && { backgroundColor: activeColor, borderColor: activeColor }]}
      activeOpacity={0.7}
    >
      <Text style={[styles.filterTxt, active && { color: colors.white }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  liveBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: colors.pinkLight, borderWidth: 1, borderColor: colors.pinkBorder,
    borderRadius: radius.full, paddingHorizontal: 8, paddingVertical: 3,
  },
  liveTxt: { fontSize: 9, fontWeight: '700', color: colors.pink, letterSpacing: 0.5 },
  expBadge: {
    backgroundColor: colors.amberLight, borderWidth: 1, borderColor: colors.amberBorder,
    borderRadius: radius.full, paddingHorizontal: 8, paddingVertical: 3,
  },
  expTxt: { fontSize: 9, fontWeight: '600', color: colors.amber },
  avatar: { borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  avatarTxt: { fontWeight: '700' },
  tag: { borderRadius: radius.full, paddingHorizontal: 8, paddingVertical: 3 },
  tagTxt: { fontSize: 9, fontWeight: '600', letterSpacing: 0.3 },
  joinBtn: { borderRadius: radius.full, paddingHorizontal: 16, paddingVertical: 7 },
  joinTxt: { fontSize: 12, fontWeight: '600' },
  secHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.lg, marginBottom: spacing.sm },
  secTitle: { fontSize: 16, fontWeight: '700', color: colors.white },
  secAction: { fontSize: 12, color: colors.pink },
  filterPill: {
    paddingHorizontal: 14, paddingVertical: 6,
    borderRadius: radius.full, borderWidth: 1, borderColor: colors.dark5,
    marginRight: 6,
  },
  filterTxt: { fontSize: 11, fontWeight: '500', color: colors.soft },
});
