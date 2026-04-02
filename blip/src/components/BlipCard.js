import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../theme';
import { Avatar, Tag, LiveBadge, ExpiryBadge, JoinButton } from './UI';

export function BlipCard({ item, onPress }) {
  const [joined, setJoined] = useState(false);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      {item.type === 'sponsored' && (
        <Text style={styles.sponsoredLabel}>SPONSORED BLIP</Text>
      )}
      <View style={styles.cardTop}>
        <Avatar initials={item.user.initials} color={item.user.color} />
        <View style={styles.meta}>
          <Text style={styles.userName}>{item.user.name}</Text>
          <Text style={styles.userSub}>{item.user.community}</Text>
        </View>
        {item.isLive ? <LiveBadge /> : item.expiresIn ? <ExpiryBadge label={item.expiresIn} /> : null}
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.description}</Text>
        <View style={styles.tags}>
          {item.tags.map((t, i) => (
            <Tag key={i} label={t} variant={i === 0 ? item.user.color : 'dark'} />
          ))}
        </View>
        <View style={styles.footer}>
          <View style={styles.joinersRow}>
            <View style={styles.joinerAvatars}>
              {item.joinerInitials.slice(0, 2).map((init, i) => (
                <View key={i} style={[styles.joinerAv, { marginLeft: i === 0 ? 0 : -6 }]}>
                  <Text style={styles.joinerTxt}>{init}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.joinerCount}>{item.joiners} going</Text>
          </View>
          <JoinButton
            joined={joined}
            onPress={() => setJoined(!joined)}
            variant={item.type === 'sponsored' ? 'dark' : 'pink'}
            label={item.type === 'sponsored' ? 'Interested' : undefined}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function TableBlipCard({ item, onPress }) {
  const [joined, setJoined] = useState(false);
  const seats = Array(item.totalSeats).fill(null).map((_, i) => i < item.takenSeats);

  return (
    <TouchableOpacity
      style={[styles.card, styles.tableCard]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.cardTop}>
        <View style={styles.restIcon}>
          <Text style={{ fontSize: 18 }}>🍕</Text>
        </View>
        <View style={styles.meta}>
          <Text style={styles.userName}>{item.restaurant}</Text>
          <Text style={styles.userSub}>📍 {item.location}</Text>
        </View>
        <View style={styles.tableBadge}>
          <Text style={styles.tableBadgeTxt}>TABLE BLIP</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.description}</Text>

        <View style={styles.tableFooter}>
          <View>
            <View style={styles.seatsRow}>
              {seats.map((taken, i) => (
                <View key={i} style={[styles.seat, taken ? styles.seatTaken : styles.seatEmpty]}>
                  <Text style={{ fontSize: 9, color: taken ? colors.white : colors.muted }}>{taken ? '✓' : '·'}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.seatsLabel}>{item.takenSeats} of {item.totalSeats} seats taken</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.depositAmt}>₹{item.deposit}</Text>
            <Text style={styles.depositLabel}>seat deposit</Text>
          </View>
        </View>

        <JoinButton
          joined={joined}
          onPress={() => setJoined(!joined)}
          variant="teal"
          label={joined ? 'Seat reserved ✓' : 'Reserve a seat via UPI'}
          style={{ marginTop: 10, borderRadius: 12 }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.md,
    marginBottom: 10,
    backgroundColor: colors.dark3,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.dark4,
    overflow: 'hidden',
  },
  tableCard: {
    borderColor: colors.tealBorder,
    backgroundColor: 'rgba(29,158,117,0.07)',
  },
  sponsoredLabel: {
    paddingHorizontal: spacing.md,
    paddingTop: 6,
    fontSize: 9,
    fontWeight: '700',
    color: colors.amber,
    letterSpacing: 0.6,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: spacing.md,
    paddingBottom: 8,
  },
  meta: { flex: 1 },
  userName: { fontSize: 12, fontWeight: '600', color: colors.white },
  userSub: { fontSize: 10, color: colors.muted, marginTop: 1 },
  cardBody: { paddingHorizontal: spacing.md, paddingBottom: spacing.md },
  title: { fontSize: 15, fontWeight: '700', color: colors.white, marginBottom: 4, lineHeight: 20 },
  desc: { fontSize: 11, color: colors.soft, lineHeight: 16, marginBottom: 8 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginBottom: 10 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  joinersRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  joinerAvatars: { flexDirection: 'row' },
  joinerAv: {
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: colors.dark5, borderWidth: 1.5, borderColor: colors.dark3,
    alignItems: 'center', justifyContent: 'center',
  },
  joinerTxt: { fontSize: 7, fontWeight: '700', color: colors.pale },
  joinerCount: { fontSize: 10, color: colors.soft },
  restIcon: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: colors.tealLight, borderWidth: 1, borderColor: colors.tealBorder,
    alignItems: 'center', justifyContent: 'center',
  },
  tableBadge: {
    backgroundColor: colors.teal, borderRadius: radius.full,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  tableBadgeTxt: { fontSize: 8, fontWeight: '700', color: colors.white, letterSpacing: 0.5 },
  tableFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  seatsRow: { flexDirection: 'row', gap: 4, marginBottom: 4 },
  seat: { width: 22, height: 22, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  seatTaken: { backgroundColor: colors.teal },
  seatEmpty: { borderWidth: 1, borderStyle: 'dashed', borderColor: colors.mid },
  seatsLabel: { fontSize: 9, color: colors.soft },
  depositAmt: { fontSize: 20, fontWeight: '700', color: colors.teal },
  depositLabel: { fontSize: 9, color: colors.soft },
});
