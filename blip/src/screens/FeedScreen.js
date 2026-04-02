import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';
import { colors, spacing, radius } from '../theme';
import { FilterPill } from '../components/UI';
import { BlipCard, TableBlipCard } from '../components/BlipCard';
import { blips } from '../data';

const FILTERS = ['All blips', 'My college', 'City-wide', '🍜 Food', '⚽ Sport', '☕ Chill', '📚 Study'];

export default function FeedScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState('All blips');

  const filtered = blips.filter(b => {
    if (activeFilter === 'All blips') return true;
    if (activeFilter === 'My college') return b.category === 'college';
    if (activeFilter === 'City-wide') return b.category === 'city';
    if (activeFilter === '🍜 Food') return b.vibe === 'food';
    if (activeFilter === '⚽ Sport') return b.vibe === 'sport';
    if (activeFilter === '☕ Chill') return b.vibe === 'chill';
    if (activeFilter === '📚 Study') return b.vibe === 'study';
    return true;
  });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.city}>Bengaluru</Text>
            <Text style={styles.heading}>What's on? ⚡</Text>
          </View>
          <TouchableOpacity style={styles.notifBtn}>
            <Text style={styles.notifIcon}>🔔</Text>
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          {FILTERS.map(f => (
            <FilterPill
              key={f}
              label={f}
              active={activeFilter === f}
              onPress={() => setActiveFilter(f)}
            />
          ))}
        </ScrollView>

        {/* Blip cards */}
        <View style={{ paddingTop: spacing.sm }}>
          {filtered.map(item => (
            item.type === 'table'
              ? <TableBlipCard key={item.id} item={item} onPress={() => navigation.navigate('BlipDetail', { item })} />
              : <BlipCard key={item.id} item={item} onPress={() => navigation.navigate('BlipDetail', { item })} />
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.dark },
  scroll: { flex: 1 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end',
    paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.md,
  },
  city: { fontSize: 10, color: colors.muted, letterSpacing: 0.8, textTransform: 'uppercase' },
  heading: { fontSize: 24, fontWeight: '800', color: colors.white, marginTop: 2 },
  notifBtn: { position: 'relative', width: 36, height: 36, borderRadius: 18, backgroundColor: colors.dark3, borderWidth: 1, borderColor: colors.dark4, alignItems: 'center', justifyContent: 'center' },
  notifIcon: { fontSize: 15 },
  notifDot: { position: 'absolute', top: 6, right: 6, width: 7, height: 7, borderRadius: 4, backgroundColor: colors.pink, borderWidth: 1.5, borderColor: colors.dark3 },
  filters: { paddingHorizontal: spacing.lg, paddingBottom: spacing.md },
});
