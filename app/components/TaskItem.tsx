import React from 'react';
import Realm from 'realm';
import {View, Text, Pressable, StyleSheet, TouchableOpacity} from 'react-native';

import {shadows} from '../styles/shadows';
import colors from '../styles/colors';
import {Task} from '../models/Task';

type TaskItemProps = {
  task: Task & Realm.Object;
  onToggleStatus: () => void;
  onDelete: () => void;
  onAddSubItems: () => void;
};

export const TaskItem = React.memo<TaskItemProps>(
  ({task, onToggleStatus, onDelete, onAddSubItems}) => {
    return (
      <>
        <View style={styles.task}>
          <Pressable
            onPress={onToggleStatus}
            style={[styles.status, task.isComplete && styles.completed]}>
            <Text style={styles.icon}>{task.isComplete ? '✓' : '○'}</Text>
          </Pressable>
          <View style={styles.descriptionContainer}>
            <Text numberOfLines={1} style={styles.description}>
              {task.description}
            </Text>
          </View>
          <Pressable onPress={onDelete} style={styles.deleteButton}>
            <Text style={styles.deleteText}>Delete</Text>
          </Pressable>
        </View>
        <View>
          <TouchableOpacity onPress={onAddSubItems}>
            <Text style={styles.edit}>{`Toggle address (object <-> null)`}</Text>
          </TouchableOpacity>
          <Text style={styles.subItems}>SubItems: {JSON.stringify(task.items)}</Text>
        </View>
      </>
    );
  },
);

const styles = StyleSheet.create({
  edit: {color: 'yellow'},
  subItems: {color: 'white'},
  task: {
    height: 50,
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginVertical: 8,
    backgroundColor: colors.white,
    borderRadius: 5,
    ...shadows,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    paddingHorizontal: 10,
    color: colors.black,
    fontSize: 17,
  },
  status: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: colors.gray,
  },
  completed: {
    backgroundColor: colors.purple,
  },
  deleteButton: {
    justifyContent: 'center',
  },
  deleteText: {
    marginHorizontal: 10,
    color: colors.gray,
    fontSize: 17,
  },
  icon: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
