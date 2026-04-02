import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';
import { colors, spacing, radius } from '../theme';
import { Avatar, Tag, LiveBadge, ExpiryBadge, JoinButton } from '../components/UI';

export default function BlipDetailScreen({ route, navigation }) {
  const { item } = route.params;
  const [joined, setJoined] = useState(false);

  const infoItems = [
    { label: '📍 Location', value: 'Cubbon Park Turf', color: colors.white },
    { label: '🕐 Time', value: 'Sun 7:00 AM', color: colors.white },
    { label: '⏱ Expires in', value: item.expiresIn || 'Live now', color: colors.amber },
    { label: '👥 Spots left', value: '4 of 6', color: colors.teal },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Back */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.topTitle}>Blip details</Text>
        </View>

        {/* Main card */}
        <View style={styles.card}>
          <View style={styles.cardTop}>
            <Avatar initials={item.user.initials} color={item.user.color} size={42} />
            <View style={styles.meta}>
              <Text style={styles.userName}>{item.user.name}</Text>
              <Text style={styles.userScore}>Blip score: <Text style={{ color: colors.teal, fontWeight: '700' }}>847</Text> · 94% show-up</Text>
            </View>
            {item.isLive ? <LiveBadge /> : item.expiresIn ? <ExpiryBadge label={item.expiresIn} /> : null}
          </View>

          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.desc}>{item.description}{'\n\nAll skill levels welcome — it\'s for fun! Show up on time. If you can\'t make it please let the group know.'}</Text>

          <View style={styles.tags}>
            {item.tags.map((t, i) => <Tag key={i} label={t} variant={i === 0 ? item.user.color : 'dark'} />)}
          </View>

          {/* Info grid */}
          <View style={styles.infoGrid}>
            {infoItems.map((info, i) => (
              <View key={i} style={styles.infoBox}>
                <Text style={styles.infoLabel}>{info.label}</Text>
                <Text style={[styles.infoVal, { color: info.color }]}>{info.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Joiners */}
        <Text style={styles.sectionTitle}>Going ({item.joiners})</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.joinersScroll}>
          {item.joinerInitials.map((init, i) => (
            <View key={i} style={styles.joinerCard}>
              <Avatar initials={init} color={['pink', 'teal', 'amber', 'blue'][i % 4]} size={28} />
              <View style={{ marginLeft: 6 }}>
                <Text style={styles.joinerName}>{init}</Text>
                <Text style={styles.joinerConfirm}>✓ Confirmed</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Chat preview */}
        <Text style={styles.sectionTitle}>Chat 💬</Text>
        <View style={styles.chatBox}>
          <Text style={styles.chatNotice}>Unlocked after joining</Text>
          <View style={styles.chatMsg}>
            <Text style={[styles.chatName, { color: colors.teal }]}>Arjun: </Text>
            <Text style={styles.chatText}>Anyone need a ride from Indiranagar?</Text>
          </View>
          <View style={[styles.chatMsg, { marginTop: 6 }]}>
            <Text style={[styles.chatName, { color: colors.pink }]}>Meera: </Text>
            <Text style={styles.chatText}>Yes please!! 🙌</Text>
          </View>
        </View>

        {/* Join button */}
        <View style={styles.joinWrap}>
          <JoinButton
            joined={joined}
            onPress={() => setJoined(!joined)}
            style={{ borderRadius: 14, paddingVertical: 14 }}
          />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.dark },
  topBar: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: spacing.lg, paddingBottom: spacing.sm },
  backBtn: { width: 32, height: 32, borderRadius: 8, backgroundColor: colors.dark3, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 16, color: colors.white },
  topTitle: { fontSize: 17, fontWeight: '700', color: colors.white },
  card: { marginHorizontal: spacing.md, backgroundColor: colors.dark3, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.dark4, padding: spacing.md, marginBottom: spacing.md },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: spacing.md },
  meta: { flex: 1 },
  userName: { fontSize: 14, fontWeight: '600', color: colors.white },
  userScore: { fontSize: 10, color: colors.muted, marginTop: 2 },
  title: { fontSize: 18, fontWeight: '800', color: colors.white, marginBottom: 8, lineHeight: 24 },
  desc: { fontSize: 12, color: colors.soft, lineHeight: 18, marginBottom: 10 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginBottom: 12 },
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  infoBox: { width: '47%', backgroundColor: colors.dark4, borderRadius: radius.md, padding: 10 },
  infoLabel: { fontSize: 10, color: colors.muted, marginBottom: 3 },
  infoVal: { fontSize: 12, fontWeight: '600' },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: colors.white, paddingHorizontal: spacing.lg, marginBottom: spacing.sm },
  joinersScroll: { paddingHorizontal: spacing.md, gap: 8, marginBottom: spacing.md },
  joinerCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.dark3, borderWidth: 1, borderColor: colors.dark4, borderRadius: 14, padding: 10 },
  joinerName: { fontSize: 11, fontWeight: '600', color: colors.white },
  joinerConfirm: { fontSize: 9, color: colors.teal, marginTop: 1 },
  chatBox: { marginHorizontal: spacing.md, backgroundColor: colors.dark3, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.md },
  chatNotice: { fontSize: 10, color: colors.muted, marginBottom: 8 },
  chatMsg: { flexDirection: 'row', backgroundColor: colors.dark4, borderRadius: 10, padding: 8 },
  chatName: { fontSize: 11, fontWeight: '700' },
  chatText: { fontSize: 11, color: colors.soft },
  joinWrap: { paddingHorizontal: spacing.md },
});
