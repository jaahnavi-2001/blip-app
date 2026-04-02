import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { colors, spacing, radius } from '../theme';

const pastBlips = [
  { emoji: '🍜', name: 'Maggi run at 11pm', meta: 'Tonight · 5 joined', badge: 'live' },
  { emoji: '🍕', name: 'Table Blip — Social', meta: 'Sat · 4 showed up · ₹600 collected', badge: 'done' },
  { emoji: '📚', name: 'DSA exam prep', meta: 'Fri · 6 showed up', badge: 'done' },
  { emoji: '⚽', name: '5-a-side football', meta: 'Last Sun · 6 showed up', badge: 'done' },
];

const myComms = [
  { icon: '🎓', name: 'BITS Goa', color: '#EEEDFE' },
  { icon: '🏙️', name: 'Bengaluru', color: '#E1F5EE' },
  { icon: '⚽', name: 'BFC Fans', color: '#FAEEDA' },
];

export default function ProfileScreen() {
  const scorePercent = 73;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Settings icon */}
        <View style={styles.topBar}>
          <View />
          <TouchableOpacity style={styles.settingsBtn}>
            <Text style={{ fontSize: 18 }}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Avatar + name */}
        <View style={styles.hero}>
          <View style={styles.avatar}>
            <Text style={styles.avatarTxt}>RK</Text>
          </View>
          <Text style={styles.name}>Rohan Kapoor</Text>
          <Text style={styles.handle}>@rohanblips · BITS Goa '26</Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statNum}>34</Text>
              <Text style={styles.statLbl}>Blips dropped</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNum}>127</Text>
              <Text style={styles.statLbl}>Plans joined</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNum}>96%</Text>
              <Text style={styles.statLbl}>Show-up rate</Text>
            </View>
          </View>
        </View>

        {/* Blip Score */}
        <View style={styles.scoreCard}>
          <View style={styles.scoreTop}>
            <View>
              <Text style={styles.scoreLbl}>BLIP SCORE</Text>
              <Text style={styles.scoreNum}>847</Text>
              <Text style={styles.scoreRank}>Top 12% in Bengaluru</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 28, marginBottom: 2 }}>🏅</Text>
              <Text style={styles.scoreUnlocked}>City-wide reach</Text>
              <Text style={styles.scoreUnlockedSub}>Unlocked at 800+</Text>
            </View>
          </View>
          <View style={styles.scoreBarBg}>
            <View style={[styles.scoreBarFill, { width: `${scorePercent}%` }]} />
          </View>
          <View style={styles.scoreBarLabels}>
            <Text style={styles.scoreBarLbl}>0</Text>
            <Text style={styles.scoreBarLbl}>Next: 900 — Featured host</Text>
            <Text style={styles.scoreBarLbl}>1000</Text>
          </View>
        </View>

        {/* Communities */}
        <Text style={styles.sectionTitle}>My communities</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.commScroll}>
          {myComms.map((c, i) => (
            <View key={i} style={styles.commChip}>
              <View style={[styles.commChipIcon, { backgroundColor: c.color }]}>
                <Text style={{ fontSize: 14 }}>{c.icon}</Text>
              </View>
              <Text style={styles.commChipName}>{c.name}</Text>
            </View>
          ))}
          <TouchableOpacity style={[styles.commChip, { borderStyle: 'dashed', borderColor: colors.dark5 }]}>
            <Text style={styles.addComm}>+ Add</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Recent blips */}
        <Text style={styles.sectionTitle}>Recent blips</Text>
        {pastBlips.map((b, i) => (
          <View key={i} style={styles.pastCard}>
            <View style={[styles.pastIcon, { backgroundColor: colors.dark4 }]}>
              <Text style={{ fontSize: 16 }}>{b.emoji}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.pastName}>{b.name}</Text>
              <Text style={styles.pastMeta}>{b.meta}</Text>
            </View>
            {b.badge === 'live' ? (
              <View style={styles.liveBadge}><Text style={styles.liveTxt}>LIVE</Text></View>
            ) : (
              <Text style={styles.doneTxt}>✓ Done</Text>
            )}
          </View>
        ))}

        {/* Edit profile button */}
        <TouchableOpacity style={styles.editBtn} activeOpacity={0.85}>
          <Text style={styles.editTxt}>Edit profile</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.dark },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', padding: spacing.lg, paddingBottom: 0 },
  settingsBtn: { width: 32, height: 32, borderRadius: 8, backgroundColor: colors.dark3, alignItems: 'center', justifyContent: 'center' },
  hero: { alignItems: 'center', padding: spacing.lg, paddingTop: spacing.md },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.pinkLight, borderWidth: 2, borderColor: colors.pinkBorder, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  avatarTxt: { fontSize: 26, fontWeight: '800', color: colors.pink },
  name: { fontSize: 20, fontWeight: '800', color: colors.white },
  handle: { fontSize: 12, color: colors.muted, marginTop: 3, marginBottom: 14 },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  stat: { alignItems: 'center' },
  statNum: { fontSize: 18, fontWeight: '700', color: colors.white },
  statLbl: { fontSize: 10, color: colors.muted, marginTop: 2 },
  statDivider: { width: 1, height: 28, backgroundColor: colors.dark4 },
  scoreCard: {
    marginHorizontal: spacing.md, marginBottom: spacing.md,
    backgroundColor: 'rgba(212,83,126,0.08)', borderWidth: 1, borderColor: colors.pinkBorder,
    borderRadius: radius.lg, padding: spacing.md,
  },
  scoreTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.sm },
  scoreLbl: { fontSize: 10, fontWeight: '700', color: colors.muted, letterSpacing: 0.8, marginBottom: 2 },
  scoreNum: { fontSize: 32, fontWeight: '800', color: colors.pink },
  scoreRank: { fontSize: 10, color: colors.soft, marginTop: 2 },
  scoreUnlocked: { fontSize: 11, fontWeight: '600', color: colors.pink },
  scoreUnlockedSub: { fontSize: 9, color: colors.muted, marginTop: 1 },
  scoreBarBg: { height: 4, backgroundColor: colors.dark4, borderRadius: 2, overflow: 'hidden', marginBottom: 4 },
  scoreBarFill: { height: '100%', backgroundColor: colors.pink, borderRadius: 2 },
  scoreBarLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  scoreBarLbl: { fontSize: 9, color: colors.muted },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: colors.white, paddingHorizontal: spacing.lg, marginBottom: spacing.sm },
  commScroll: { paddingHorizontal: spacing.md, gap: 8, marginBottom: spacing.md },
  commChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.dark3, borderWidth: 1, borderColor: colors.dark4, borderRadius: radius.md, padding: 8, paddingRight: 12 },
  commChipIcon: { width: 28, height: 28, borderRadius: 7, alignItems: 'center', justifyContent: 'center' },
  commChipName: { fontSize: 12, fontWeight: '500', color: colors.white },
  addComm: { fontSize: 12, fontWeight: '500', color: colors.muted, padding: 4 },
  pastCard: {
    marginHorizontal: spacing.md, marginBottom: 6,
    backgroundColor: colors.dark3, borderWidth: 1, borderColor: colors.dark4,
    borderRadius: 14, padding: spacing.md, flexDirection: 'row', alignItems: 'center', gap: 10,
  },
  pastIcon: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  pastName: { fontSize: 12, fontWeight: '600', color: colors.white },
  pastMeta: { fontSize: 10, color: colors.muted, marginTop: 2 },
  liveBadge: { backgroundColor: colors.pinkLight, borderWidth: 1, borderColor: colors.pinkBorder, borderRadius: 20, paddingHorizontal: 7, paddingVertical: 3 },
  liveTxt: { fontSize: 9, fontWeight: '700', color: colors.pink },
  doneTxt: { fontSize: 10, fontWeight: '600', color: colors.teal },
  editBtn: { marginHorizontal: spacing.md, marginTop: spacing.md, borderWidth: 1, borderColor: colors.dark5, borderRadius: 12, padding: 12, alignItems: 'center' },
  editTxt: { fontSize: 14, fontWeight: '600', color: colors.pale },
});
