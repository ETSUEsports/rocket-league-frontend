function DecodeStatfeed(event) {
    let item = { type: "EVENT_TYPE", primary_player: { id: "PRIMARY_ID", name: "PRIMARY_NAME", team: -1 }, secondary_player: { id: "SECONDARY_ID", name: "SECONDARY_NAME", team: -1 } };
    switch (event.event_name) {
        case 'Shot':
            item.type = "SHOT";
            item.primary_player.id = event.main_target.id;
            item.primary_player.name = event.main_target.name;
            item.primary_player.team = event.main_target.team_num;
            delete item.secondary_player;
            return item;
        case 'Save':
            item.type = "SAVE";
            item.primary_player.id = event.main_target.id;
            item.primary_player.name = event.main_target.name;
            item.primary_player.team = event.main_target.team_num;
            delete item.secondary_player;
            return item;
        case 'Demolish':
            item.type = "SAVE";
            item.primary_player.id = event.main_target.id;
            item.primary_player.name = event.main_target.name;
            item.primary_player.team = event.main_target.team_num;
            item.secondary_player.id = event.secondary_target.id;
            item.secondary_player.name = event.secondary_target.name;
            item.secondary_player.team = event.secondary_target.team_num;
            return item;
        case 'MVP':
            item.type = "MVP";
            item.primary_player.id = event.main_target.id;
            item.primary_player.name = event.main_target.name;
            item.primary_player.team = event.main_target.team_num;
            delete item.secondary_player;
            return item;
        default:
            console.warn("Unknown event type: " + event.event_name);
            break;
    }
}

export default DecodeStatfeed;
