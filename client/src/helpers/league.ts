export interface ILeague {
    draftDetail: { drafted: boolean; inProgress: boolean };
    gameId: number;
    id: number;
    scoringPeriodId: number;
    seasonId: number;
    segmentId: number;
    settings: {
        acquisitionSettings: {
            acquisitionBudget: number;
            acquisitionLimit: number;
            acquisitionType: string;
            isUsingAcquisitionBudget: boolean;
            matchupAcquisitionLimit: number;
            matchupLimitPerScoringPeriod: boolean;
            minimumBid: number;
            waiverHours: number;
            waiverOrderReset: boolean;
            waiverProcessHour: number;
        };
        draftSettings: {
            auctionBudget: number;
            availableDate: number;
            date: number;
            isTradingEnabled: boolean;
            keeperCount: number;
            keeperCountFuture: number;
            keeperOrderType: string;
            leagueSubType: string;
            orderType: string;
            pickOrder: [];
            timePerSelection: number;
            type: string;
        };
        financeSettings: {
            entryFee: number;
            miscFee: number;
            perLoss: number;
            perTrade: number;
            playerAcquisition: number;
            playerDrop: number;
            playerMoveToActive: number;
            playerMoveToIR: number;
        };
        isCustomizable: boolean;
        isPublic: boolean;
        name: string;
        restrictionType: string;
        rosterSettings: {
            isBenchUnlimited: boolean;
            isUsingUndroppableList: boolean;
            lineupLocktimeType: string;
            lineupSlotCounts: [];
            lineupSlotStatLimits: {};
            moveLimit: number;
            positionLimits: [];
            rosterLocktimeType: string;
            universeIds: [];
        };
        scheduleSettings: {
            divisions: [];
            matchupPeriodCount: number;
            matchupPeriodLength: number;
            matchupPeriods: [];
            periodTypeId: number;
            playoffMatchupPeriodLength: number;
            playoffSeedingRule: string;
            playoffSeedingRuleBy: number;
            playoffTeamCount: number;
        };
        scoringSettings: {
            allowOutOfPositionScoring: false;
            homeTeamBonus: number;
            matchupTieRule: string;
            matchupTieRuleBy: number;
            playerRankType: string;
            playoffHomeTeamBonus: number;
            playoffMatchupTieRule: string;
            playoffMatchupTieRuleBy: number;
            scoringItems: [];
            scoringType: string;
        };
        size: number;
        tradeSettings: {
            allowOutOfUniverse: boolean;
            deadlineDate: number;
            max: number;
            revisionHours: number;
            vetoVotesRequired: number;
        };
    };
    status: {
        activatedDate: number;
        createdAsLeagueType: number;
        currentLeagueType: number;
        currentMatchupPeriod: number;
        finalScoringPeriod: number;
        firstScoringPeriod: number;
        isActive: boolean;
        isExpired: boolean;
        isFull: boolean;
        isPlayoffMatchupEdited: boolean;
        isToBeDeleted: boolean;
        isViewable: boolean;
        isWaiverOrderEdited: boolean;
        latestScoringPeriod: number;
        previousSeasons: [];
        standingsUpdateDate: number;
        teamsJoined: number;
        transactionScoringPeriod: number;
        waiverLastExecutionDate: number;
    };
}
