import Blob "mo:base/Blob";
import Nat32 "mo:base/Nat32";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";

actor RecordingContract {
    type RecordingId = Nat32;

    type Recording = {
        creator : Principal;
        audioBlob : Blob;
    };

    stable var recordingId : RecordingId = 0;
    let recordings = HashMap.HashMap<Text, Recording>(0, Text.equal, Text.hash);

    private func generateRecordingId() : Nat32 {
        recordingId += 1;
        return recordingId;
    };

    public shared ({ caller }) func sendRecording(recordingBlob : Blob) : async Nat32 {
        let id = generateRecordingId();
        let newRecording : Recording = {
            creator = caller; // This gets the principal ID of the caller
            audioBlob = recordingBlob;
        };
        recordings.put(Nat32.toText(id), newRecording);
        Debug.print("New recording saved with ID: " # Nat32.toText(id));
        return id; // Return the recording ID to the caller
    };

    public query func getRecording(id : RecordingId) : async ?Recording {
        return recordings.get(Nat32.toText(id));
    };

    public query func getRecordings() : async [(Text, Recording)] {
        return Iter.toArray(recordings.entries());
    };

    public func deleteRecording(id : RecordingId) : async Bool {
        let result = recordings.remove(Nat32.toText(id));
        return result != null;
    };
};
