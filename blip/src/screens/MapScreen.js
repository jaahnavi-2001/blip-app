import React, { useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Animated, Dimensions,
} from 'react-native';
import { colors, spacing, radius } from '../theme';
import { mapBlips } from '../data';

const { width } = Dimensions.get('window');
const MAP_H = 280;

function PingDot({ color, delay = 0 }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);
  return (
    <Animated.View style={[styles.pingRing, {
      borderColor: color,
      opacity: anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.6, 0.2, 0] }),
      transform: [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [1, 2.4] }) }],
    }]} />
  );
}

const nearby = [
  { emoji: '🍜', name: 'Maggi run at 11pm', dist: '0.3 km', count: '5 going', badge: 'live', color: colors.pink },
  { emoji: '🍕', name: 'Social Koramangala', dist: '0.7 km', count: 'Table Blip · ₹150 deposit', badge: 'table', color: colors.teal },
  { emoji: '⚽', name: '5-a-side football', dist: '1.2 km', count: '2 going · 6h left', badge: 'exp', color: colors.amber },
  { emoji: '📚', name: 'DSA Study sesh', dist: '1.8 km', count: '5 going · 5h left', badge: 'exp', color: colors.blue },
];

export default function MapScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.heading}>Blip Map 📍</Text>
          <Text style={styles.sub}>Live activity near you</Text>
        </View>

        {/* Filter pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
          {['All', 'Food', 'Sport', 'Table Blip', 'Chill', 'Study'].map((f, i) => (
            <TouchableOpacity key={f} style={[styles.pill, i === 0 && styles.pillOn]} activeOpacity={0.8}>
              <Text style={[styles.pillTxt, i === 0 && styles.pillTxtOn]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Map */}
        <View style={styles.mapContainer}>
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <View key={`h${i}`} style={[styles.gridH, { top: i * (MAP_H / 4) }]} />
          ))}
          {[0, 1, 2, 3, 4].map(i => (
            <View key={`v${i}`} style={[styles.gridV, { left: i * ((width - 32) / 4) }]} />
          ))}

          {/* Street lines */}
          <View style={[styles.street, { top: MAP_H * 0.38, left: 0, right: 0, height: 2 }]} />
          <View style={[styles.street, { top: MAP_H * 0.68, left: 0, right: 0, height: 1.5 }]} />
          <View style={[styles.street, { left: '30%', top: 0, bottom: 0, width: 2 }]} />
          <View style={[styles.street, { left: '65%', top: 0, bottom: 0, width: 1.5 }]} />

          {/* My location */}
          <View style={styles.myLoc}>
            <View style={styles.myLocOuter} />
            <View style={styles.myLocDot} />
          </View>

          {/* Blip pins */}
          {mapBlips.map(b => (
            <View key={b.id} style={[styles.pin, { top: parseFloat(b.top) / 100 * MAP_H - 18, left: parseFloat(b.left) / 100 * (width - 32) - 14 }]}>
              <View style={{ alignItems: 'center' }}>
                <PingDot color={b.color} delay={Math.random() * 800} />
                <View style={[styles.pinDot, { backgroundColor: b.color }]}>
                  <Text style={{ fontSize: 11 }}>{b.emoji}</Text>
                </View>
                <View style={styles.pinLabel}>
                  <Text style={styles.pinLabelTxt}>{b.label}</Text>
                </View>
              </View>
            </View>
          ))}

          {/* Heatmap */}
          <View style={styles.heatmap} />
        </View>

        {/* Nearby list */}
        <Text style={styles.sectionTitle}>Nearby ({nearby.length})</Text>
        {nearby.map((item, i) => (
          <TouchableOpacity key={i} style={styles.nearbyCard} activeOpacity={0.85}>
            <View style={[styles.nearbyIcon, { backgroundColor: item.color + '22' }]}>
              <Text style={{ fontSize: 16 }}>{item.emoji}</Text>
            </View>
            <View style={styles.nearbyInfo}>
              <Text style={styles.nearbyName}>{item.name}</Text>
              <Text style={styles.nearbyMeta}>{item.dist} · {item.count}</Text>
            </View>
            {item.badge === 'live' && (
              <View style={styles.liveBadge}><Text style={styles.liveTxt}>LIVE</Text></View>
            )}
            {item.badge === 'table' && (
              <View style={styles.tableBadge}><Text style={styles.tableTxt}>TABLE</Text></View>
            )}
          </TouchableOpacity>
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.dark },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.sm },
  heading: { fontSize: 24, fontWeight: '800', color: colors.white },
  sub: { fontSize: 12, color: colors.muted, marginTop: 2 },
  filters: { paddingHorizontal: spacing.lg, paddingBottom: spacing.md, gap: 6 },
  pill: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: colors.dark5 },
  pillOn: { backgroundColor: colors.pink, borderColor: colors.pink },
  pillTxt: { fontSize: 11, fontWeight: '500', color: colors.soft },
  pillTxtOn: { color: colors.white },
  mapContainer: {
    marginHorizontal: spacing.md, height: MAP_H,
    backgroundColor: colors.dark3, borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.dark4, overflow: 'hidden',
    marginBottom: spacing.md, position: 'relative',
  },
  gridH: { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: colors.dark5, opacity: 0.5 },
  gridV: { position: 'absolute', top: 0, bottom: 0, width: 1, backgroundColor: colors.dark5, opacity: 0.5 },
  street: { position: 'absolute', backgroundColor: colors.pale, opacity: 0.15 },
  myLoc: { position: 'absolute', top: '48%', left: '48%', alignItems: 'center', justifyContent: 'center' },
  myLocOuter: { position: 'absolute', width: 20, height: 20, borderRadius: 10, backgroundColor: 'rgba(55,138,221,0.2)' },
  myLocDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.blue, borderWidth: 2, borderColor: colors.white },
  pin: { position: 'absolute', alignItems: 'center' },
  pingRing: { position: 'absolute', width: 28, height: 28, borderRadius: 14, borderWidth: 2 },
  pinDot: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.dark },
  pinLabel: { backgroundColor: colors.dark3, borderWidth: 1, borderColor: colors.dark4, borderRadius: 4, paddingHorizontal: 4, paddingVertical: 1, marginTop: 2 },
  pinLabelTxt: { fontSize: 8, fontWeight: '600', color: colors.pale, whiteSpace: 'nowrap' },
  heatmap: { position: 'absolute', top: '40%', left: '44%', width: 70, height: 55, borderRadius: 35, backgroundColor: colors.pink, opacity: 0.07 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: colors.white, paddingHorizontal: spacing.lg, marginBottom: spacing.sm },
  nearbyCard: {
    marginHorizontal: spacing.md, marginBottom: 6,
    backgroundColor: colors.dark3, borderWidth: 1, borderColor: colors.dark4,
    borderRadius: 14, padding: spacing.md, flexDirection: 'row', alignItems: 'center', gap: 10,
  },
  nearbyIcon: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  nearbyInfo: { flex: 1 },
  nearbyName: { fontSize: 12, fontWeight: '600', color: colors.white },
  nearbyMeta: { fontSize: 10, color: colors.muted, marginTop: 2 },
  liveBadge: { backgroundColor: colors.pinkLight, borderWidth: 1, borderColor: colors.pinkBorder, borderRadius: 20, paddingHorizontal: 7, paddingVertical: 3 },
  liveTxt: { fontSize: 9, fontWeight: '700', color: colors.pink },
  tableBadge: { backgroundColor: colors.teal, borderRadius: 20, paddingHorizontal: 7, paddingVertical: 3 },
  tableTxt: { fontSize: 9, fontWeight: '700', color: colors.white },
});
