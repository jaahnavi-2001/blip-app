import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, TextInput,
} from 'react-native';
import { colors, spacing, radius } from '../theme';
import { FilterPill } from '../components/UI';
import { communities } from '../data';

const FILTERS = ['My communities', 'Colleges', 'Cities', 'Open', 'Interests'];

export default function CommunitiesScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState('My communities');
  const [joinedState, setJoinedState] = useState({});

  const isJoined = (c) => c.joined || joinedState[c.id];
  const joined = communities.filter(c => isJoined(c));
  const discover = communities.filter(c => !isJoined(c));

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.heading}>Communities</Text>
          <Text style={styles.subheading}>Find your people. Your plans.</Text>
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <TextInput
            style={styles.search}
            placeholder="🔍  Search communities..."
            placeholderTextColor={colors.muted}
          />
        </View>

        {/* Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
          {FILTERS.map(f => (
            <FilterPill key={f} label={f} active={activeFilter === f} onPress={() => setActiveFilter(f)} />
          ))}
        </ScrollView>

        {/* Joined */}
        <Text style={styles.sectionTitle}>Joined</Text>
        {joined.map(c => (
          <CommunityCard
            key={c.id}
            item={c}
            joined={true}
            onJoin={() => {}}
            onPress={() => navigation.navigate('CommunityFeed', { community: c })}
          />
        ))}

        {/* Divider */}
        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>Discover</Text>
        {discover.map(c => (
          <CommunityCard
            key={c.id}
            item={c}
            joined={!!joinedState[c.id]}
            onJoin={() => setJoinedState(s => ({ ...s, [c.id]: true }))}
            onPress={() => navigation.navigate('CommunityFeed', { community: c })}
          />
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function CommunityCard({ item, joined, onJoin, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.cardTop}>
        <View style={[styles.icon, { backgroundColor: item.color }]}>
          <Text style={{ fontSize: 20 }}>{item.icon}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.type}>{item.type}</Text>
        </View>
        <TouchableOpacity
          style={[styles.joinBtn, joined && styles.joinBtnIn]}
          onPress={joined ? undefined : onJoin}
          activeOpacity={0.8}
        >
          <Text style={[styles.joinTxt, joined && styles.joinTxtIn]}>
            {joined ? 'Joined ✓' : '+ Join'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.stats}>
        <Text style={styles.stat}><Text style={styles.statVal}>{item.members}</Text> members</Text>
        <Text style={styles.stat}><Text style={styles.statVal}>{item.blips}</Text> active blips</Text>
        <Text style={styles.stat}><Text style={styles.statVal}>{item.city}</Text></Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.dark },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.sm },
  heading: { fontSize: 24, fontWeight: '800', color: colors.white },
  subheading: { fontSize: 12, color: colors.muted, marginTop: 2 },
  searchWrap: { marginHorizontal: spacing.md, marginBottom: spacing.md },
  search: {
    backgroundColor: colors.dark3, borderWidth: 1, borderColor: colors.dark4,
    borderRadius: radius.md, padding: spacing.md, fontSize: 13, color: colors.white,
  },
  filters: { paddingHorizontal: spacing.lg, paddingBottom: spacing.md },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: colors.white, paddingHorizontal: spacing.lg, marginBottom: spacing.sm },
  card: {
    marginHorizontal: spacing.md, marginBottom: 8,
    backgroundColor: colors.dark3, borderWidth: 1, borderColor: colors.dark4,
    borderRadius: radius.lg, padding: spacing.md,
  },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  icon: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: '700', color: colors.white },
  type: { fontSize: 11, color: colors.soft, marginTop: 1 },
  joinBtn: {
    borderWidth: 1, borderColor: colors.pinkBorder,
    borderRadius: radius.full, paddingHorizontal: 12, paddingVertical: 6,
  },
  joinBtnIn: { backgroundColor: colors.pinkLight },
  joinTxt: { fontSize: 11, fontWeight: '600', color: colors.pink },
  joinTxtIn: { color: colors.pink },
  stats: { flexDirection: 'row', gap: 12 },
  stat: { fontSize: 10, color: colors.muted },
  statVal: { color: colors.pale, fontWeight: '600' },
  divider: { height: 1, backgroundColor: colors.dark4, marginHorizontal: spacing.md, marginVertical: spacing.md },
});
