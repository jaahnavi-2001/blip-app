import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { colors, spacing, radius } from '../theme';
import { BlipCard } from '../components/BlipCard';
import { blips } from '../data';

export default function CommunityFeedScreen({ route, navigation }) {
  const { community } = route.params;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Back + header */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={[styles.commIcon, { backgroundColor: community.color }]}>
            <Text style={{ fontSize: 16 }}>{community.icon}</Text>
          </View>
          <View>
            <Text style={styles.commName}>{community.name}</Text>
            <Text style={styles.commSub}>{community.members} members · {community.blips} active blips</Text>
          </View>
        </View>

        {/* Quick post */}
        <View style={styles.quickPost}>
          <View style={styles.quickAv}>
            <Text style={{ fontSize: 12, fontWeight: '700', color: colors.pink }}>ME</Text>
          </View>
          <Text style={styles.quickPlaceholder}>Drop a Blip to {community.name.split(' ')[0]} folks...</Text>
          <TouchableOpacity style={styles.quickBtn}>
            <Text style={styles.quickBtnTxt}>Blip</Text>
          </TouchableOpacity>
        </View>

        {/* Blips */}
        {blips.filter(b => b.type !== 'sponsored').map(item => (
          <BlipCard
            key={item.id}
            item={item}
            onPress={() => navigation.navigate('BlipDetail', { item })}
          />
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.dark },
  topBar: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: spacing.lg, paddingBottom: spacing.md },
  backBtn: { width: 30, height: 30, borderRadius: 8, backgroundColor: colors.dark3, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 14, color: colors.white },
  commIcon: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  commName: { fontSize: 15, fontWeight: '700', color: colors.white },
  commSub: { fontSize: 10, color: colors.muted, marginTop: 1 },
  quickPost: {
    marginHorizontal: spacing.md, marginBottom: spacing.md,
    backgroundColor: colors.dark3, borderWidth: 1, borderColor: colors.dark4,
    borderRadius: radius.md, padding: spacing.md,
    flexDirection: 'row', alignItems: 'center', gap: 8,
  },
  quickAv: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.pinkLight, borderWidth: 1, borderColor: colors.pinkBorder, alignItems: 'center', justifyContent: 'center' },
  quickPlaceholder: { flex: 1, fontSize: 12, color: colors.muted },
  quickBtn: { backgroundColor: colors.pink, borderRadius: radius.full, paddingHorizontal: 12, paddingVertical: 5 },
  quickBtnTxt: { fontSize: 12, fontWeight: '700', color: colors.white },
});
