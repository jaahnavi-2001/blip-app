import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView,
  TextInput, Switch, Alert,
} from 'react-native';
import { colors, spacing, radius } from '../theme';

const VIBES = ['🍜 Food', '☕ Chill', '⚽ Sport', '📚 Study', '🎵 Music', '🚗 Road trip', '🎮 Gaming', '💻 Tech'];
const DURATIONS = ['1h', '2h', '4h', '8h'];
const COMMUNITIES = ['🎓 BITS Goa', '🏙️ Bengaluru', '🌍 All India', '⚽ BFC Fans'];
const VISIBILITY = ['My college', 'City-wide', 'Open'];

export default function CreateScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [vibe, setVibe] = useState('🍜 Food');
  const [duration, setDuration] = useState('8h');
  const [selectedComms, setSelectedComms] = useState(['🎓 BITS Goa']);
  const [visibility, setVisibility] = useState('My college');
  const [isTable, setIsTable] = useState(false);
  const [restaurant, setRestaurant] = useState('');
  const [tableSize, setTableSize] = useState('');
  const [deposit, setDeposit] = useState('');

  const toggleComm = (c) => {
    setSelectedComms(prev =>
      prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
    );
  };

  const handlePost = () => {
    if (!title.trim()) {
      Alert.alert('Add a title!', 'What\'s the plan?');
      return;
    }
    Alert.alert('Blipped! ⚡', 'Your plan is live. People can see it now.', [
      { text: 'View feed', onPress: () => navigation.navigate('Feed') }
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.heading}>Drop a Blip ⚡</Text>
          <Text style={styles.sub}>Something happening? Tell people.</Text>
        </View>

        <View style={styles.form}>
          {/* Title */}
          <View style={styles.group}>
            <Text style={styles.label}>WHAT'S THE PLAN?</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Chai run, football, study sesh..."
              placeholderTextColor={colors.muted}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* Description */}
          <View style={styles.group}>
            <Text style={styles.label}>TELL THEM MORE</Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              placeholder="Add details, location, anything useful..."
              placeholderTextColor={colors.muted}
              value={desc}
              onChangeText={setDesc}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Vibe */}
          <View style={styles.group}>
            <Text style={styles.label}>VIBE</Text>
            <View style={styles.vibeGrid}>
              {VIBES.map(v => (
                <TouchableOpacity
                  key={v}
                  style={[styles.vibeBtn, vibe === v && styles.vibeBtnOn]}
                  onPress={() => setVibe(v)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.vibeTxt, vibe === v && styles.vibeTxtOn]}>{v}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Duration */}
          <View style={styles.group}>
            <Text style={styles.label}>EXPIRES IN</Text>
            <View style={styles.row}>
              {DURATIONS.map(d => (
                <TouchableOpacity
                  key={d}
                  style={[styles.durBtn, duration === d && styles.durBtnOn]}
                  onPress={() => setDuration(d)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.durTxt, duration === d && styles.durTxtOn]}>{d}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Communities */}
          <View style={styles.group}>
            <Text style={styles.label}>POST TO COMMUNITY</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.commRow}>
                {COMMUNITIES.map(c => (
                  <TouchableOpacity
                    key={c}
                    style={[styles.commPill, selectedComms.includes(c) && styles.commPillOn]}
                    onPress={() => toggleComm(c)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.commTxt, selectedComms.includes(c) && styles.commTxtOn]}>{c}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Visibility */}
          <View style={styles.group}>
            <Text style={styles.label}>VISIBILITY</Text>
            <View style={styles.row}>
              {VISIBILITY.map(v => (
                <TouchableOpacity
                  key={v}
                  style={[styles.durBtn, visibility === v && styles.durBtnOn]}
                  onPress={() => setVisibility(v)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.durTxt, visibility === v && styles.durTxtOn]}>{v}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Table Blip */}
          <View style={styles.group}>
            <Text style={styles.label}>TABLE BLIP</Text>
            <View style={styles.tableToggle}>
              <Text style={{ fontSize: 18 }}>🍽️</Text>
              <Text style={styles.toggleLabel}>Restaurant hangout with seat deposit</Text>
              <Switch
                value={isTable}
                onValueChange={setIsTable}
                trackColor={{ false: colors.dark5, true: colors.teal }}
                thumbColor={colors.white}
              />
            </View>
            {isTable && (
              <View style={styles.tableFields}>
                <View style={styles.twoCol}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.label, { marginBottom: 4 }]}>RESTAURANT</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Name / place"
                      placeholderTextColor={colors.muted}
                      value={restaurant}
                      onChangeText={setRestaurant}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.label, { marginBottom: 4 }]}>TABLE SIZE</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. 6"
                      placeholderTextColor={colors.muted}
                      keyboardType="numeric"
                      value={tableSize}
                      onChangeText={setTableSize}
                    />
                  </View>
                </View>
                <Text style={[styles.label, { marginBottom: 4, marginTop: 8 }]}>SEAT DEPOSIT (₹)</Text>
                <View style={styles.depositRow}>
                  <Text style={styles.rupee}>₹</Text>
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="100–500"
                    placeholderTextColor={colors.muted}
                    keyboardType="numeric"
                    value={deposit}
                    onChangeText={setDeposit}
                  />
                </View>
                <Text style={styles.depositHint}>Counts toward bill. 3% platform fee applies.</Text>
              </View>
            )}
          </View>

          {/* Post button */}
          <TouchableOpacity style={styles.postBtn} onPress={handlePost} activeOpacity={0.85}>
            <Text style={styles.postTxt}>Blip it ⚡</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.dark },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.sm },
  heading: { fontSize: 24, fontWeight: '800', color: colors.white },
  sub: { fontSize: 12, color: colors.muted, marginTop: 2 },
  form: { padding: spacing.md },
  group: { marginBottom: spacing.md },
  label: { fontSize: 10, fontWeight: '700', color: colors.muted, letterSpacing: 0.8, marginBottom: 6 },
  input: {
    backgroundColor: colors.dark3, borderWidth: 1, borderColor: colors.dark4,
    borderRadius: radius.md, padding: spacing.md, fontSize: 13, color: colors.white,
  },
  textarea: { height: 72, textAlignVertical: 'top' },
  vibeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  vibeBtn: {
    paddingHorizontal: 12, paddingVertical: 7,
    borderRadius: radius.full, borderWidth: 1, borderColor: colors.dark5,
  },
  vibeBtnOn: { backgroundColor: colors.pink, borderColor: colors.pink },
  vibeTxt: { fontSize: 12, fontWeight: '500', color: colors.soft },
  vibeTxtOn: { color: colors.white },
  row: { flexDirection: 'row', gap: 8 },
  durBtn: {
    flex: 1, paddingVertical: 9, borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.dark5, alignItems: 'center',
  },
  durBtnOn: { backgroundColor: colors.dark4, borderColor: colors.mid },
  durTxt: { fontSize: 12, fontWeight: '600', color: colors.soft },
  durTxtOn: { color: colors.white },
  commRow: { flexDirection: 'row', gap: 7 },
  commPill: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: radius.full, borderWidth: 1, borderColor: colors.dark5,
  },
  commPillOn: { backgroundColor: colors.blueLight, borderColor: colors.blueBorder },
  commTxt: { fontSize: 12, fontWeight: '500', color: colors.soft },
  commTxtOn: { color: colors.blue },
  tableToggle: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: colors.dark3, borderWidth: 1, borderColor: colors.dark4,
    borderRadius: radius.md, padding: spacing.md,
  },
  toggleLabel: { flex: 1, fontSize: 13, color: colors.pale },
  tableFields: { marginTop: 10, gap: 4 },
  twoCol: { flexDirection: 'row', gap: 8 },
  depositRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rupee: { fontSize: 18, fontWeight: '700', color: colors.teal },
  depositHint: { fontSize: 10, color: colors.muted, marginTop: 4 },
  postBtn: {
    backgroundColor: colors.pink, borderRadius: 14,
    padding: spacing.md, alignItems: 'center', marginTop: spacing.sm,
  },
  postTxt: { fontSize: 15, fontWeight: '800', color: colors.white, letterSpacing: 0.3 },
});
